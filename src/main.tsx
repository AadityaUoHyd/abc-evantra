//src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AttendeeLandingPage from "./pages/AttendeeLandingPage.tsx";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import OrganizersAnalyticsPage from "./pages/OrganizersAnalyticsPage.tsx";
import OrganizerManageEventPage from "./pages/OrganizerManageEventPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CallbackPage from "./pages/CallbackPage.tsx";
import OrganizerListEventsPage from "./pages/OrganizerListEventsPage.tsx";
import PublishedEventsPage from "./pages/PublishedEventsPage.tsx";
import PurchaseTicketPage from "./pages/PurchaseTicketPage.tsx";
import DashboardListTickets from "./pages/DashboardListTickets.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import DashboardViewTicketPage from "./pages/DashboardViewTicketPage.tsx";
import DashboardValidateQrPage from "./pages/DashboardValidateQrPage.tsx";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnAndRefund from "./pages/ReturnAndRefund";
import FAQs from "./pages/FAQs.tsx";
import EvantraCommunity from "./pages/EvantraCommunity";
import Contact from "./pages/Contact.tsx";
import OurPartners from "./pages/OurPartners.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AttendeeLandingPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy,
  },
  {
    path: "/return",
    Component: ReturnAndRefund,
  },
  {
    path: "/community",
    Component: EvantraCommunity,
  },
  {
    path: "/faq",
    Component: FAQs,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/partners",
    Component: OurPartners,
  },
  {
    path: "/callback",
    Component: CallbackPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/events/:id",
    Component: PublishedEventsPage,
  },
    {
    path: "/events",
    Component: EventsPage,
  },
  {
    path: "/events/:eventId/purchase/:ticketTypeId",
    element: (
      <ProtectedRoute>
        <PurchaseTicketPage />
      </ProtectedRoute>
    ),
  },
  
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/events",
    element: (
      <ProtectedRoute>
        <OrganizerListEventsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/tickets",
    element: (
      <ProtectedRoute>
        <DashboardListTickets />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/tickets/:id",
    element: (
      <ProtectedRoute>
        <DashboardViewTicketPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/validate-qr",
    element: (
      <ProtectedRoute>
        <DashboardValidateQrPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/events/create",
    element: (
      <ProtectedRoute>
        <OrganizerManageEventPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/events/update/:id",
    element: (
      <ProtectedRoute>
        <OrganizerManageEventPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/organizers/:organizerId/analytics",
    element: (
      <ProtectedRoute>
        <OrganizersAnalyticsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);


const oidcConfig = {
  authority: import.meta.env.VITE_KEYCLOAK_AUTHORITY,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: `${import.meta.env.VITE_FRONTEND_URL}/callback`,
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);