import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { SimplePagination } from "@/components/SimplePagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  EventSummary,
  EventStatusEnum,
  SpringBootPagination,
} from "@/domain/Domain";
import { deleteEvent, listEvents } from "@/lib/Api";
import {
  AlertCircle,
  Calendar,
  Clock,
  Edit,
  MapPin,
  Tag,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";

const OrganizerListEventsPage: React.FC = () => {
  const { isLoading, user } = useAuth();
  const [events, setEvents] = useState<
    SpringBootPagination<EventSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [deleteEventError, setDeleteEventError] = useState<
    string | undefined
  >();

  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<
    EventSummary | undefined
  >();

  useEffect(() => {
    if (isLoading || !user?.access_token) {
      return;
    }
    refreshEvents(user.access_token);
  }, [isLoading, user, page]);

  const refreshEvents = async (accessToken: string) => {
    try {
      setEvents(await listEvents(accessToken, page));
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

  const formatDate = (date?: Date) => {
    if (!date) {
      return "TBD";
    }
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date?: Date) => {
    if (!date) {
      return "";
    }
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatusBadge = (status: EventStatusEnum) => {
    switch (status) {
      case EventStatusEnum.DRAFT:
        return "bg-gray-600 text-gray-100";
      case EventStatusEnum.PUBLISHED:
        return "bg-green-600 text-green-100";
      case EventStatusEnum.CANCELLED:
        return "bg-red-600 text-red-100";
      case EventStatusEnum.COMPLETED:
        return "bg-blue-600 text-blue-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const handleOpenDeleteEventDialog = (eventToDelete: EventSummary) => {
    setEventToDelete(undefined);
    setEventToDelete(eventToDelete);
    setDialogOpen(true);
  };

  const handleCancelDeleteEventDialog = () => {
    setEventToDelete(undefined);
    setEventToDelete(undefined);
    setDialogOpen(false);
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete || isLoading || !user?.access_token) {
      return;
    }

    try {
      setDeleteEventError(undefined);
      await deleteEvent(user.access_token, eventToDelete.id);
      setEventToDelete(undefined);
      setDialogOpen(false);
      refreshEvents(user.access_token);
    } catch (err) {
      if (err instanceof Error) {
        setDeleteEventError(err.message);
      } else if (typeof err === "string") {
        setDeleteEventError(err);
      } else {
        setDeleteEventError("An unknown error has occurred");
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Your Events
            </h1>
            <p className="mt-2 text-lg text-gray-400">Events you have created</p>
          </div>
          <Link to="/dashboard/events/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200">
              Create Event
            </Button>
          </Link>
        </div>

        {/* Event Cards */}
        {events?.content.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-lg">No events created yet.</p>
            <Link to="/dashboard/events/create" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {events?.content.map((eventItem) => (
              <Card key={eventItem.id} className="bg-gray-900 border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl text-white line-clamp-2 text-wrap">
                      {eventItem.name}
                    </h3>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${formatStatusBadge(eventItem.status)}`}
                    >
                      {eventItem.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Event Start & End */}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-400 group-hover:animate-pulse" />
                    <div>
                      <p className="font-medium text-gray-200">
                        {formatDate(eventItem.start)} to {formatDate(eventItem.end)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatTime(eventItem.start)} - {formatTime(eventItem.end)}
                      </p>
                    </div>
                  </div>
                  {/* Sales Period */}
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-400 group-hover:animate-pulse" />
                    <div>
                      <h4 className="font-medium text-gray-200">Sales Period</h4>
                      <p className="text-gray-400 text-sm">
                        {formatDate(eventItem.salesStart)} to {formatDate(eventItem.salesEnd)}
                      </p>
                    </div>
                  </div>
                  {/* Venue */}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-400 group-hover:animate-pulse" />
                    <p className="font-medium text-gray-200">{eventItem.venue}</p>
                  </div>
                  {/* Ticket Types */}
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-purple-400 group-hover:animate-pulse" />
                    <div>
                      <h4 className="font-medium text-gray-200">Ticket Types</h4>
                      <ul className="mt-1 space-y-1">
                        {eventItem.ticketTypes.map((ticketType) => (
                          <li
                            key={ticketType.id}
                            className="flex justify-between items-center gap-4 text-gray-400 text-sm border-2 border-amber-50 border-bg-purple-600/20 rounded-lg p-2 hover:bg-purple-600/10 transition-colors duration-200"
                          >
                            <span className="whitespace-nowrap">{ticketType.name}</span>
                            <span className="whitespace-nowrap">₹{ticketType.price}</span>
                            <span className="whitespace-nowrap">{ticketType.gstRate}% GST</span>
                            <span className="whitespace-nowrap">{ticketType.discountRate}% Discount</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-4 bg-gray-800/50">
                  <Link to={`/dashboard/events/update/${eventItem.id}`}>
                    <Button
                      type="button"
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors duration-200"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-200"
                    onClick={() => handleOpenDeleteEventDialog(eventItem)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center py-8">
        {events && (
          <SimplePagination
            pagination={events}
            onPageChange={setPage}
          />
        )}
      </div>
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-700 rounded-xl text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-purple-400">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This will delete your event '{eventToDelete?.name}' and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteEventError && (
            <Alert variant="destructive" className="bg-gray-900 border-red-600">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertTitle className="text-red-400">Error</AlertTitle>
              <AlertDescription className="text-gray-300">{deleteEventError}</AlertDescription>
            </Alert>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDeleteEventDialog}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteEvent()}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Footer />
    </div>
  );
};

export default OrganizerListEventsPage;