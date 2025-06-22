import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const CallbackPage: React.FC = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "CallbackPage: isLoading=",
      isLoading,
      "isAuthenticated=",
      isAuthenticated,
      "error=",
      error,
      "user=",
      user
    );

    if (isLoading) return;

    if (error) {
      console.error("CallbackPage: Authentication error:", error.message);
      return;
    }

    if (isAuthenticated) {
      // Safely access realm_access.roles
      const roles = (user?.profile as { realm_access?: { roles?: string[] } })?.realm_access?.roles;
      console.log("CallbackPage: User authenticated with roles:", roles || "none");
      localStorage.removeItem("redirectPath");
      navigate("/");
    } else {
      console.warn("CallbackPage: Not authenticated, waiting for OIDC callback to complete");
    }
  }, [isLoading, isAuthenticated, error, user, navigate]);

  if (isLoading) {
    return <p>Processing login...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500">Authentication failed: {error.message}</p>
        <button
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/login")}
        >
          Try Again
        </button>
      </div>
    );
  }

  return <p>Completing login...</p>;
};

export default CallbackPage;