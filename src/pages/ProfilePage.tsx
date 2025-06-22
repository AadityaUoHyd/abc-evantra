import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAuth } from "react-oidc-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center px-4">
          <Alert variant="destructive" className="max-w-md w-full border border-red-600 bg-gray-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <AlertTitle className="text-red-500">Error</AlertTitle>
                <AlertDescription className="text-gray-300">
                  You must be logged in to view your profile.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  const handleUpdateProfile = () => {
    window.location.href = `${import.meta.env.VITE_KEYCLOAK_AUTHORITY}/account`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-purple-500 mb-6 text-center">Your Profile</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Name</label>
              <p className="text-lg text-white">{user.profile.name || "Not set"}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Email</label>
              <p className="text-lg text-white">{user.profile.email || "Not set"}</p>
            </div>
            <div className="pt-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
