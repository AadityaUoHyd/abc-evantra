import { useAuth } from "react-oidc-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Search, Star, Calendar, Users, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import {
  PublishedEventSummary,
  SpringBootPagination,
} from "@/domain/Domain";
import {
  listPublishedEvents,
  searchPublishedEvents,
} from "@/lib/Api";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import PublishedEventCard from "@/components/PublishedEventCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import HeroImg1 from "../assets/heroImg1.png";
import HeroImg2 from "../assets/heroImg2.png";
import HeroImg3 from "../assets/heroImg3.png";
import HeroImg4 from "../assets/heroImg4.jpg";
import HeroImg5 from "../assets/heroImg5.png";
import HeroImg6 from "../assets/heroImg6.png";
import HeroImg7 from "../assets/heroImg7.jpg";
import { Link } from "react-router-dom";

const MainSlidingImages = [HeroImg1, HeroImg2, HeroImg3, HeroImg4, HeroImg5, HeroImg6, HeroImg7];
// Debounce function to limit API calls
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const AttendeeLandingPage: React.FC = () => {
  const { isLoading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [publishedEvents, setPublishedEvents] = useState<
    SpringBootPagination<PublishedEventSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MainSlidingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (query && query.trim().length > 0) {
      performSearch(query);
    } else {
      refreshPublishedEvents();
    }
  }, [query]);

  const refreshPublishedEvents = async () => {
    try {
      const response = await listPublishedEvents(0);
      setPublishedEvents(response);
    } catch (err) {
      console.error("List Events Error:", err);
      handleError(err);
    }
  };

  const performSearch = async (q: string) => {
    try {
      const normalizedQuery = q.trim();
      const response = await searchPublishedEvents(normalizedQuery, 0);
      setPublishedEvents(response);
    } catch (err) {
      console.error("Search Error:", err);
      handleError(err);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((q: string) => {
    const normalizedQuery = q.trim();
    if (normalizedQuery.length === 0) {
      refreshPublishedEvents();
      return;
    }
    performSearch(normalizedQuery);
  }, 300);

  const queryPublishedEvents = () => {
    debouncedSearch(query);
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === "string") {
      setError(err);
    } else {
      setError("An unknown error has occurred");
    }
    console.error("Query Error:", err);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Alert variant="destructive" className="bg-white/10 border-red-500/50 max-w-lg mx-4 shadow-xl rounded-lg p-6">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <AlertTitle className="text-lg font-bold text-red-400">Oops!</AlertTitle>
            <AlertDescription className="text-gray-200">{error}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-lg font-medium text-purple-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <section className="relative mb-4">
        <div className="relative min-h-[400px] md:min-h-[500px] overflow-hidden">
          {MainSlidingImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero Image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center p-6 md:p-12 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 tracking-tight mb-4">
              Discover Unforgettable Events
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed">
              From concerts to workshops, find and book your next adventure with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl w-full mx-auto items-center justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  className="bg-white text-gray-900 w-full pl-12 pr-4 py-3 rounded-full border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder:text-gray-400"
                  value={query}
                  placeholder="Search events, cities, or categories..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && queryPublishedEvents()}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
              <Button
                onClick={queryPublishedEvents}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold transition-colors duration-200"
              >
                Find Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-12 tracking-wide">
          Explore Latest Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
          {publishedEvents?.content?.slice(0, 8).map((publishedEvent) => (
            <PublishedEventCard
              publishedEvent={publishedEvent}
              key={publishedEvent.id}
              className="h-full"
            />
          ))}
        </div>
        {publishedEvents?.content?.length === 0 && (
          <p className="text-gray-200 text-center py-12 text-lg">
            No events found. Try searching with different keywords or check back later.
          </p>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-12 tracking-wide">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Calendar className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Diverse Events</h3>
            <p className="text-gray-200 leading-relaxed">
              Explore a wide range of events, from music festivals to professional workshops, all in one place.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Ticket className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Easy Booking</h3>
            <p className="text-gray-200 leading-relaxed">
              Secure your tickets in just a few clicks with our seamless booking process.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Users className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
            <p className="text-gray-200 leading-relaxed">
              Join a vibrant community of event-goers and organizers passionate about creating memorable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-12 tracking-wide">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-200 italic mb-4">
                "This platform made finding and booking events so easy! The experience was seamless and fun."
              </p>
              <p className="text-white font-semibold">— Priya S.</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-gray-200 italic mb-4">
                "I discovered amazing local events I never knew about. Highly recommend!"
              </p>
              <p className="text-white font-semibold">— Arjun M.</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-200 italic mb-4">
                "The interface is sleek, and the event variety is fantastic. My go-to for weekend plans!"
              </p>
              <p className="text-white font-semibold">— Neha R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="bg-purple-600 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">
            Ready to Experience Something New?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Join thousands of attendees and dive into a world of exciting events. Your next adventure is just a click away!
          </p>
          <Button
            asChild
            className="bg-white text-purple-600 hover:bg-gray-300 rounded-full px-8 py-3 text-lg font-semibold transition-colors duration-200 pulse-glow"
          >
            <Link to="/events">Browse Events Now</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AttendeeLandingPage;