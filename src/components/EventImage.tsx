import { PublishedEventSummary } from "@/domain/Domain";

interface EventImageProps {
  event: PublishedEventSummary;
}

const EventImage: React.FC<EventImageProps> = ({ event }) => {
  return (
    <img
      src={event.imageUrl || "/placeholder-image.jpg"}
      alt={event.name}
      className="object-cover w-full h-full"
    />
  );
};

export default EventImage;
