import NavBar from "@/components/NavBar";
import { SimplePagination } from "@/components/SimplePagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpringBootPagination, TicketSummary } from "@/domain/Domain";
import { listTickets, getTicket } from "@/lib/Api";
import { AlertCircle, Tag, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCalendarDay, FaCircle, FaUser } from "react-icons/fa";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";
import { format } from "date-fns";
import Footer from "@/components/Footer";

const DashboardListTickets: React.FC = () => {
  const { isLoading, user } = useAuth();

  const [tickets, setTickets] = useState<
    SpringBootPagination<TicketSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(0);
  const [ticketDetailsCache, setTicketDetailsCache] = useState<
    Record<string, { eventName: string; eventStart: Date }>
  >({});

  useEffect(() => {
    if (isLoading || !user?.access_token) {
      return;
    }

    const doUseEffect = async () => {
      try {
        const ticketData = await listTickets(user.access_token, page);
        setTickets(ticketData);

        // Fetch event details for each ticket
        const newCache: Record<string, { eventName: string; eventStart: Date }> = { ...ticketDetailsCache };
        for (const ticket of ticketData.content) {
          if (!newCache[ticket.id]) {
            const details = await getTicket(user.access_token, ticket.id);
            newCache[ticket.id] = {
              eventName: details.eventName,
              eventStart: details.eventStart,
            };
          }
        }
        setTicketDetailsCache(newCache);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "string") {
          setError(err);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    doUseEffect();
  }, [isLoading, user?.access_token, page]);

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <NavBar />
        <Alert variant="destructive" className="bg-gray-900 border-red-600 max-w-md mx-4 p-6 rounded-xl shadow-lg">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <AlertTitle className="text-lg font-semibold text-red-400">Error</AlertTitle>
          <AlertDescription className="text-gray-300">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <NavBar />
      {/* Title */}
      <div className="py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
          Your Tickets
        </h1>
        <p className="mt-2 text-lg text-gray-400">Explore the events you're attending</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        {tickets?.content.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-lg">No tickets purchased yet.</p>
            <Link to="/events" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {tickets?.content.map((ticketItem) => (
              <Link key={ticketItem.id} to={`/dashboard/tickets/${ticketItem.id}`}>
                <Card className="bg-gray-900 border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FaCircle className="h-4 w-4 text-white group-hover:animate-pulse" />
                        <h3 className="font-bold text-xl text-white line-clamp-2 text-wrap">
                          {ticketDetailsCache[ticketItem.id]?.eventName || "Loading..."}
                        </h3>
                      </div>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          ticketItem.status === "PURCHASED"
                            ? "bg-green-500 text-white"
                            : ticketItem.status === "CANCELLED"
                            ? "bg-red-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {ticketItem.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-amber-500">
                          {user?.profile?.preferred_username}
                      </span>
                    </div>
                    {/* Ticket Type */}
                    <div className="flex items-center gap-3">
                      <Ticket className="h-5 w-5 text-purple-400" />
                      <p className="font-medium text-gray-200">{ticketItem.ticketType.name} Class Ticket</p>
                    </div>
                    {/* Event Date */}
                    <div className="flex items-center gap-3">
                      <FaCalendarDay className="h-5 w-5 text-purple-400" />
                      <p className="font-medium text-gray-200">
                        {ticketDetailsCache[ticketItem.id]?.eventStart
                          ? format(new Date(ticketDetailsCache[ticketItem.id].eventStart), "PPP p")
                          : "Loading..."} 
                        <span className="text-gray-400 text-sm ml-1">(Event Timing)</span>
                      </p>
                    </div>
                    {/* Pricing Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Price:</span>
                        <p className="font-medium text-gray-200">₹{ticketItem.ticketType.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">GST:</span>
                        <p className="font-medium text-gray-200">{ticketItem.ticketType.gstRate}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Discount:</span>
                        <p className="font-medium text-gray-200">{ticketItem.ticketType.discountRate}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Final Amount:</span>
                        <p className="font-bold text-purple-400">
                          ₹{Math.round(
                            ticketItem.ticketType.price +
                              (ticketItem.ticketType.price * ticketItem.ticketType.gstRate * 0.01) -
                              (ticketItem.ticketType.price * ticketItem.ticketType.discountRate * 0.01)
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Ticket ID */}
                    <div className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-purple-400" />
                      <div>
                        <h4 className="font-medium text-gray-200">Ticket ID</h4>
                        <p className="text-gray-400 font-mono text-sm">{ticketItem.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center py-8">
        {tickets && (
          <SimplePagination
            pagination={tickets}
            onPageChange={setPage}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardListTickets;