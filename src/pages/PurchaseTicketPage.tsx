import NavBar from "@/components/NavBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PublishedEventTicketTypeDetails } from "@/domain/Domain";
import { confirmPurchase, getPublishedEvent, purchaseTicket } from "@/lib/Api";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  realm_access?: {
    roles?: string[];
  };
}

const PurchaseTicketPage: React.FC = () => {
  const { eventId, ticketTypeId } = useParams();
  const { isLoading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);
  const [ticketType, setTicketType] = useState<PublishedEventTicketTypeDetails | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Direct JWT role check for ROLE_ATTENDEE
  const canPurchase = (() => {
    if (!user?.access_token) {
      console.log("No access token available");
      return false;
    }
    try {
      const payload = jwtDecode<JwtPayload>(user.access_token);
      const roles = payload.realm_access?.roles || [];
      console.log("JWT roles:", roles); // Debugging log
      return roles.includes("ROLE_ATTENDEE") && !roles.includes("ROLE_ORGANIZER") && !roles.includes("ROLE_STAFF");
    } catch (err) {
      console.error("Error decoding JWT:", err);
      return false;
    }
  })();

  useEffect(() => {
    const fetchTicketType = async () => {
      if (!eventId || !ticketTypeId) {
        setError("Event ID or Ticket Type ID is missing");
        return;
      }
      try {
        const eventData = await getPublishedEvent(eventId);
        const selectedTicketType = eventData.ticketTypes.find(
          (tt) => tt.id === ticketTypeId
        );
        if (!selectedTicketType) {
          throw new Error("Ticket type not found");
        }
        setTicketType(selectedTicketType);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch ticket details");
      }
    };

    fetchTicketType();
  }, [eventId, ticketTypeId]);

  useEffect(() => {
    if (!isPurchaseSuccess) return;
    const timer = setTimeout(() => {
      navigate("/dashboard/tickets");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isPurchaseSuccess, navigate]);

  const handlePurchase = async () => {
  if (
    authLoading ||
    !user?.access_token ||
    !eventId ||
    !ticketTypeId ||
    !(window as any).Razorpay
  ) {
    setError("Please ensure you're logged in and Razorpay is loaded");
    return;
  }

  setIsProcessing(true);
  setError(undefined);

  try {
    const purchaseResponse = await purchaseTicket(user.access_token, eventId, ticketTypeId, quantity);
    console.log("PurchaseTicket response:", purchaseResponse); // Debug log
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: purchaseResponse.amount,
      currency: purchaseResponse.currency,
      order_id: purchaseResponse.orderId,
      name: "ABC Evantra",
      description: `Ticket Purchase for ${ticketType?.name || "Event"}`,
      handler: async function (response: any) {
        try {
          console.log("Razorpay handler response:", response); // Debug log
          await confirmPurchase(user.access_token, eventId, ticketTypeId, purchaseResponse.orderId, quantity);
          setIsPurchaseSuccess(true);
        } catch (err: any) {
          console.error("ConfirmPurchase error:", err);
          setError(err.message || "Unable to confirm your purchase. Please contact support.");
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        email: user.profile.email,
        contact: user.profile.phone_number,
      },
      theme: {
        color: "#9333ea",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err: any) {
    console.error("handlePurchase error:", err);
    setError(err.message || "Unable to process your purchase");
    setIsProcessing(false);
  }
};

  if (isPurchaseSuccess) {
    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h2>
            <p className="text-gray-700 text-base mb-1">
              Your ticket purchase was <span className="font-semibold">successful</span>.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your tickets page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authLoading || !ticketType) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const finalAmount = Math.round(
    ticketType.price * quantity * (1 + ticketType.gstRate / 100 - ticketType.discountRate / 100)
  );

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="max-w-md mx-auto py-20">
        <div className="bg-white border-gray-300 shadow-sm border rounded-lg space-y-4 p-6 text-black">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!canPurchase && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>Only attendees can purchase tickets.</AlertDescription>
            </Alert>
          )}
          <h2 className="text-xl font-semibold">{ticketType.name}</h2>
          <p className="text-gray-600">{ticketType.description}</p>
          <p className="text-lg">Price per ticket: ₹{ticketType.price}</p>
          <p className="text-lg">GST: {ticketType.gstRate}%</p>
          <p className="text-lg">Discount: {ticketType.discountRate}%</p>
          <div className="flex items-center gap-2">
            <label className="text-lg">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded p-1"
              disabled={authLoading || isProcessing || !canPurchase || ticketType.seatLeft === 0}
            >
              {[...Array(Math.min(10, ticketType.seatLeft || 10)).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <p className="text-lg">Seats Available: {ticketType.seatLeft}</p>
          <p className="text-2xl font-bold text-purple-600">Payable Amount: ₹{finalAmount}</p>
          <div className="flex justify-center">
            <Button
              className={`pulse-glow bg-purple-500 hover:bg-purple-800 text-white rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                (authLoading || isProcessing || !canPurchase || ticketType.seatLeft === 0) ? "opacity-50 cursor-not-allowed bg-gray-600 hover:bg-gray-600" : "cursor-pointer"
              }`}
              onClick={handlePurchase}
              disabled={authLoading || isProcessing || !canPurchase || ticketType.seatLeft === 0}
            >
              {ticketType.seatLeft === 0 ? "Sold Out" : isProcessing ? "Processing..." : "Pay with Razorpay"}
            </Button>
            <Button onClick={() => navigate("/events")}
              className="mx-3 bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-200">
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketPage;