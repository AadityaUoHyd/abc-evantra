import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const { isLoading, isAuthenticated, signinRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      navigate("/");
    } else {
      signinRedirect().catch((err) => console.error("LoginPage: signinRedirect failed:", err.message));
    }
  }, [isLoading, isAuthenticated, signinRedirect, navigate]);

  return <div>Redirecting to login...</div>;
};

export default LoginPage;