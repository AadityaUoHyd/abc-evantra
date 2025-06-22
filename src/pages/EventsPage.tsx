import { useAuth } from "react-oidc-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PublishedEventSummary, SpringBootPagination } from "@/domain/Domain";
import { listPublishedEvents, searchPublishedEvents } from "@/lib/Api";
import PublishedEventCard from "@/components/PublishedEventCard";
import { SimplePagination } from "@/components/SimplePagination";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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

const EventsPage: React.FC = () => {
  const { isLoading } = useAuth();
  const [page, setPage] = useState(0);
  const [publishedEvents, setPublishedEvents] = useState<
    SpringBootPagination<PublishedEventSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (query && query.trim().length > 0) {
      performSearch(query, page);
    } else {
      refreshPublishedEvents(page);
    }
  }, [page, query]);

  const refreshPublishedEvents = async (pageNumber: number) => {
    try {
      const response = await listPublishedEvents(pageNumber);
      setPublishedEvents(response);
    } catch (err) {
      console.error("List Events Error:", err);
      handleError(err);
    }
  };

  const performSearch = async (q: string, pageNumber: number) => {
    try {
      const normalizedQuery = q.trim();
      const response = await searchPublishedEvents(normalizedQuery, pageNumber);
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
      setPage(0);
      refreshPublishedEvents(0);
      return;
    }
    setPage(0);
    performSearch(normalizedQuery, 0);
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
    console.error("Error Handled:", err);
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
        {/* Search Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 tracking-tight mb-6">
            Browse All Events
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Find concerts, workshops, festivals, and more in your city or beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto items-center justify-center">
            <div className="relative w-full max-w-md">
              <Input
                className="bg-gray-800 text-white w-full pl-12 pr-4 py-3 rounded-full border-gray-600 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder:text-gray-400"
                value={query}
                placeholder="Search events, cities, or categories..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && queryPublishedEvents()}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
            </div>
            <Button
              onClick={queryPublishedEvents}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold transition-colors duration-200"
            >
              Search
            </Button>
          </div>
        </section>

        {/* Events Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
            {publishedEvents?.content?.map((publishedEvent) => (
              <PublishedEventCard
                key={publishedEvent.id}
                publishedEvent={publishedEvent}
              />
            ))}
          </div>
          {publishedEvents?.content?.length === 0 && (
            <p className="text-gray-400 text-center py-12 text-lg">
              No events found. Try searching with different keywords or check back later.
            </p>
          )}
        </section>

        {/* Pagination */}
        {publishedEvents && (
          <div className="w-full flex justify-center py-16">
            <SimplePagination
              pagination={publishedEvents}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;