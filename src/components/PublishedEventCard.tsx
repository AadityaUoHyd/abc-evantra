import { PublishedEventSummary } from "@/domain/Domain";
import { Card } from "./ui/card";
import { Calendar, Heart, MapPin, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import EventImage from "./EventImage";

interface PublishedEventCardProperties {
  publishedEvent: PublishedEventSummary;
  className?: string;
}

const PublishedEventCard: React.FC<PublishedEventCardProperties> = ({
  publishedEvent,
  className,
}) => {

  // ✅ Share handler
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    const shareData = {
      title: publishedEvent.name,
      text: `Check out this event: ${publishedEvent.name}`,
      url: `${window.location.origin}/events/${publishedEvent.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed", error);
    }
  };

  return (
    <Link to={`/events/${publishedEvent.id}`} className={`block w-full max-w-sm ${className}`}>
      <Card className="flex flex-col h-[400px] overflow-hidden max-w-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 border border-gray-700 text-white">
        {/* Card Image */}
        <div className="h-48 overflow-hidden">
          <EventImage event={publishedEvent as any} />
        </div>
        <div className="p-4 flex flex-col flex-grow space-y-2">
          <h3 className="text-lg font-semibold text-purple-400 line-clamp-2 leading-tight min-h-[48px]">{publishedEvent.name}</h3>
          <div className="space-y-1 text-sm text-gray-300 flex-grow">
            <div className="flex items-center gap-2 min-h-[20px]">
              <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="line-clamp-1">{publishedEvent.venue}</span>
            </div>
            <div className="flex items-center gap-2 min-h-[20px]">
              <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0" />
              {publishedEvent.start && publishedEvent.end ? (
                <span className="line-clamp-1">
                  {format(publishedEvent.start, "PP")} - {format(publishedEvent.end, "PP")}
                </span>
              ) : (
                <span>Dates TBD</span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-600">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600">
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
            </button>

            {/* ✅ Share button with functionality */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
              title="Share this event"
            >
              <Share2 className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PublishedEventCard;
