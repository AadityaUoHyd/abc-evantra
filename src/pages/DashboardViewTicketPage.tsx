import { TicketDetails, TicketStatus } from "@/domain/Domain";
import { getTicket, getTicketQr } from "@/lib/Api";
import { format } from "date-fns";
import { Calendar, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";

// ...imports remain unchanged

const DashboardViewTicketPage: React.FC = () => {
  const [ticket, setTicket] = useState<TicketDetails | undefined>();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>();
  const [isQrLoading, setIsQrCodeLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const { id } = useParams();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading || !user?.access_token || !id) return;

    const fetchData = async () => {
      try {
        setIsQrCodeLoading(true);
        setError(undefined);

        const ticketData = await getTicket(user.access_token, id);
        const qrBlob = await getTicketQr(user.access_token, id);

        setTicket(ticketData);
        setQrCodeUrl(URL.createObjectURL(qrBlob));
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "An unknown error has occurred";
        setError(message);
      } finally {
        setIsQrCodeLoading(false);
      }
    };

    fetchData();

    return () => {
      if (qrCodeUrl) URL.revokeObjectURL(qrCodeUrl);
    };
  }, [user?.access_token, isLoading, id]);

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.PURCHASED:
        return "text-green-400";
      case TicketStatus.CANCELLED:
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  if (!ticket) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-br from-pink-900 via-yellow-800 to-gray-700 rounded-3xl p-8 shadow-2xl relative">

          {/* Ticket Status */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full mb-2">
            <span className={`text-sm font-semibold ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          {/* Event Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 mt-4">{ticket.eventName}</h1>
            <div className="flex items-center gap-2 text-purple-200 mb-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{ticket.eventVenue}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>
                {format(ticket.eventStart, "Pp")} – {format(ticket.eventEnd, "Pp")}
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg w-40 h-40 flex items-center justify-center">
              {isQrLoading ? (
                <div className="text-xs text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 mb-2 mx-auto"></div>
                  <p className="text-gray-800">Loading QR...</p>
                </div>
              ) : error ? (
                <div className="text-red-400 text-sm text-center">
                  <div className="mb-1">⚠️</div>
                  {error}
                </div>
              ) : (
                qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-full h-full object-contain rounded-md"
                  />
                )
              )}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-purple-200">
              Present this QR code at the venue for entry
            </p>
          </div>

          {/* Ticket Metadata */}
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-amber-500">
                {user?.profile?.preferred_username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-amber-500">
                {ticket.name}
              </span>
              <span className="text-gray-100">[{ticket.description}]</span>
            </div>
            <div className="font-semibold text-gray-100">
              Price Paid: ₹
              {Math.round(
                ticket.price *
                  (1 + ticket.gstRate / 100 - ticket.discountRate / 100)
              )}
            </div>
          </div>

          {/* Ticket ID */}
          <div className="text-center mb-4">
            <h4 className="text-sm font-semibold font-mono text-gray-300">
              Ticket ID
            </h4>
            <p className="text-white text-sm font-mono bg-purple-900 px-2 py-1 rounded-md inline-block mt-1">
              {ticket.id}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 mt-6">
            <p className="mb-1">Powered by</p>
            <img
              src="/logo.png"
              alt="ABC Evantra"
              className="w-8 h-8 mx-auto mb-1"
            />
            ABC Evantra
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewTicketPage;
