import EventImage from "@/components/EventImage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  PublishedEventDetails,
  PublishedEventTicketTypeDetails,
} from "@/domain/Domain";
import { getPublishedEvent } from "@/lib/Api";
import { AlertCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useRoles } from "@/hooks/UseRoles";
import Footer from "@/components/Footer";

const PublishedEventsPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { isAttendee } = useRoles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const [publishedEvent, setPublishedEvent] = useState<
    PublishedEventDetails | undefined
  >();
  const [selectedTicketType, setSelectedTicketType] = useState<
    PublishedEventTicketTypeDetails | undefined
  >();

  useEffect(() => {
    if (!id) {
      setError("ID must be provided!");
      return;
    }

    const doUseEffect = async () => {
      try {
        const eventData = await getPublishedEvent(id);
        setPublishedEvent(eventData);
        if (eventData.ticketTypes.length > 0) {
          setSelectedTicketType(eventData.ticketTypes[0]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "string") {
          setError(err);
        } else {
          setError("An unknown error has occurred");
        }
      }
    };
    doUseEffect();
  }, [id]);

  const handlePurchaseClick = () => {
    if (!isAttendee) {
      const message = encodeURIComponent(JSON.stringify({ message: "login as user to purchase event tickets" }));
      navigate(`/login?message=${message}`);
    } else if (publishedEvent?.id && selectedTicketType?.id) {
      navigate(`/events/${publishedEvent.id}/purchase/${selectedTicketType.id}`);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Alert variant="destructive" className="bg-gray-900 border-red-700 max-w-lg mx-4 p-6 rounded-xl shadow-lg">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <AlertTitle className="text-lg font-semibold text-red-400">Error</AlertTitle>
            <AlertDescription className="text-gray-300">{error}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-lg font-medium text-purple-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 tracking-tight">
              {publishedEvent?.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed border-2 border-purple-500 p-2">{publishedEvent?.eventDescription}</p>
            <p className="text-lg flex gap-3 text-gray-200 items-center font-medium">
              <MapPin className="h-6 w-6 text-purple-400" />
              {publishedEvent?.venue}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 aspect-[16/9]">
            {publishedEvent && <EventImage event={publishedEvent} />}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-purple-400 mb-8 tracking-wide text-center">Available Tickets</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            {publishedEvent?.ticketTypes?.map((ticketType) => (
              <Card
                className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white cursor-pointer transition-all duration-200 hover:shadow-lg rounded-xl"
                key={ticketType.id}
                onClick={() => setSelectedTicketType(ticketType)}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-semibold text-purple-300">{ticketType.name}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                      <span>Price: ₹{ticketType.price}</span>
                      <span>GST: {ticketType.gstRate}%</span>
                      <span>Discount: {ticketType.discountRate}%</span>
                      <span>Seats Left: {ticketType.seatLeft}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">{ticketType.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-600 flex flex-col place-content-center-safe text-center shadow-lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-500">{selectedTicketType?.name}</h2>
              <p className="text-gray-300 leading-relaxed">{selectedTicketType?.description}</p>
              {selectedTicketType && (
                <>
                  <div className="text-lg text-gray-300">Seats Available: {selectedTicketType.seatLeft}</div>
                  <span className="text-3xl font-extrabold text-purple-400">
                    Payable: ₹
                    {Math.round(
                      selectedTicketType.price *
                        (1 + selectedTicketType.gstRate / 100 - selectedTicketType.discountRate / 100)
                    )}
                  </span>
                </>
              )}
            </div>
            <Button
              onClick={handlePurchaseClick}
              disabled={!selectedTicketType || isLoading || selectedTicketType?.seatLeft === 0}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-6 text-lg font-semibold transition-colors duration-200 mt-6 ${
                (!selectedTicketType || isLoading || selectedTicketType?.seatLeft === 0) ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {selectedTicketType?.seatLeft === 0 ? "Sold Out" : "Purchase Ticket"}
            </Button>
            {selectedTicketType?.seatLeft === 0 && (
              <p className="text-red-400 mt-4">Sorry! No tickets left anymore, all booked. Better luck next time!</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublishedEventsPage;