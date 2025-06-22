import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, BarChart2, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { getOrganizerAnalytics } from "@/lib/Api";
import { OrganizerAnalyticsResponse } from "@/domain/Domain";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useRoles } from "@/hooks/UseRoles";

const COLORS = ['#9333ea', '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const OrganizerAnalyticsPage: React.FC = () => {
  const { isLoading: authLoading, user } = useAuth();
  const { isOrganizer } = useRoles();
  const [analytics, setAnalytics] = useState<OrganizerAnalyticsResponse | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.access_token || !isOrganizer) return;
      try {
        setIsLoading(true);
        const data = await getOrganizerAnalytics(user.access_token);
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.access_token, isOrganizer]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-lg font-medium text-purple-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isOrganizer) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Alert variant="destructive" className="bg-gray-900 border-red-700 max-w-lg mx-4 p-6 rounded-xl shadow-lg">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <AlertTitle className="text-lg font-semibold text-red-400">Access Denied</AlertTitle>
            <AlertDescription className="text-gray-300">Only organizers can view analytics.</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

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

  const ticketTypePieData = analytics?.ticketTypeRevenue.map((item) => ({
    name: item.ticketTypeName,
    value: item.percentage,
  })) || [];

  const topEventsBarData = analytics?.topEvents.map((item) => ({
    name: item.eventName,
    revenue: item.revenue,
  })) || [];

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-6">
            Organizer Analytics
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Track performance across your events, including ticket sales, revenue, and ticket type contributions.
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-800 rounded-lg p-5 flex items-center gap-4 shadow-md">
              <Ticket className="text-purple-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Total Tickets Sold</p>
                <p className="text-lg font-bold text-white">{analytics?.totalTicketsSold || 0}</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 flex items-center gap-4 shadow-md">
              <BarChart2 className="text-purple-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-lg font-bold text-white">₹{analytics?.totalRevenue.toFixed(2) || "0.00"}</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-6 mb-10">
            {/* Pie Chart */}
            <Card className="bg-gray-800 border-gray-600 w-full">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-400">Revenue by Ticket Type</h3>
              </CardHeader>
              <CardContent>
                {ticketTypePieData.length > 0 ? (
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ticketTypePieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius="80%"
                          fill="#8884d8"
                          label
                        >
                          {ticketTypePieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center">No data available</div>
                )}
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-gray-800 border-gray-600 w-full">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-400">Top Events by Revenue</h3>
              </CardHeader>
              <CardContent>
                {topEventsBarData.length > 0 ? (
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topEventsBarData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `₹${Number(value).toFixed(2)}`} />
                        <Bar dataKey="revenue" fill="#9333ea" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center">No data available</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top Events Table */}
          <Card className="bg-gray-800 border-gray-600">
            <CardHeader>
              <h3 className="text-lg font-semibold text-purple-400">Top Performing Events</h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-700 text-gray-400">
                    <tr>
                      <th className="p-3 font-medium">Event</th>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Tickets Sold</th>
                      <th className="p-3 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.topEvents.map((event) => (
                      <tr key={event.eventId} className="border-t border-gray-700 hover:bg-gray-700/40">
                        <td className="p-3">{event.eventName}</td>
                        <td className="p-3">{event.eventDate}</td>
                        <td className="p-3">{event.ticketsSold}</td>
                        <td className="p-3">₹{event.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                    {analytics?.topEvents.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-3 text-center text-gray-500">No events data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerAnalyticsPage;
