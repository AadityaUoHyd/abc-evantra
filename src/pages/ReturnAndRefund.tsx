import { FaUndo, FaTicketAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const ReturnAndRefund: React.FC = () => {
  return (
    <div>
    <NavBar/>
    <div className="bg-black text-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 flex items-center justify-center">
            <FaUndo className="mr-2" /> Return & Refund Policy
          </h1>
          <p className="mt-4 text-gray-300">
            Last updated: June, 2025
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Introduction</h2>
          <p className="text-gray-300">
            At ABC Evantra, we strive to ensure a fair and transparent refund process for our users. This Return and Refund Policy outlines the conditions under which refunds may be requested for ticket purchases and event-related services on our platform. Please read this policy carefully before purchasing tickets.
          </p>
        </section>

        {/* General Refund Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <FaTicketAlt className="mr-2" /> General Refund Policy
          </h2>
          <p className="text-gray-300 mb-4">
            Refunds for tickets purchased through ABC Evantra are subject to the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Event Organizer Policies:</strong> Each event organizer sets their own refund policy, which is displayed during the ticket purchase process. You agree to abide by these policies when purchasing tickets.</li>
            <li><strong>Non-Refundable Tickets:</strong> Unless otherwise stated by the event organizer, tickets are generally non-refundable except in cases of event cancellation or significant changes.</li>
            <li><strong>Service Fees:</strong> ABC Evantra’s service and processing fees are non-refundable, even if a refund is issued for the ticket price.</li>
            <li><strong>Request Timeline:</strong> Refund requests must be submitted within the timeframe specified by the event organizer, typically no later than 7 days before the event.</li>
          </ul>
        </section>

        {/* Event Cancellations */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Event Cancellations</h2>
          <p className="text-gray-300 mb-4">
            If an event is cancelled by the organizer, you may be eligible for a refund:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Full Refunds:</strong> If the event is cancelled and not rescheduled, you will receive a full refund of the ticket price (excluding service fees).</li>
            <li><strong>Automatic Processing:</strong> Refunds are typically processed automatically within 5-10 business days to the original payment method.</li>
            <li><strong>Notification:</strong> You will be notified via email about the cancellation and refund process.</li>
          </ul>
        </section>

        {/* Event Changes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Event Changes</h2>
          <p className="text-gray-300 mb-4">
            Significant changes to an event (e.g., date, time, venue) may entitle you to a refund:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Eligibility:</strong> Refunds may be offered if the change significantly impacts your ability to attend, subject to the organizer’s policy.</li>
            <li><strong>Request Process:</strong> Contact the event organizer or our support team within 48 hours of the change notification to request a refund.</li>
            <li><strong>Partial Refunds:</strong> In some cases, organizers may offer partial refunds or ticket exchanges for rescheduled events.</li>
          </ul>
        </section>

        {/* How to Request a Refund */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">How to Request a Refund</h2>
          <p className="text-gray-300 mb-4">
            To request a refund, follow these steps:
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Log in to your ABC Evantra account.</li>
            <li>Navigate to “My Tickets” in the dashboard.</li>
            <li>Select the event and ticket you wish to refund.</li>
            <li>Follow the prompts to submit a refund request, including the reason for the request.</li>
            <li>Await confirmation from the event organizer or our support team.</li>
          </ol>
          <p className="text-gray-300 mt-4">
            Alternatively, contact us at <a href="mailto:support@abcevantra.com" className="text-purple-600 hover:underline">support@abcevantra.com</a> with your order details.
          </p>
        </section>

        {/* Non-Refundable Circumstances */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Non-Refundable Circumstances</h2>
          <p className="text-gray-300 mb-4">
            Refunds will not be issued in the following cases:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Change of mind or inability to attend, unless permitted by the organizer’s policy.</li>
            <li>Lost or stolen tickets, unless verified by our support team.</li>
            <li>Minor event changes (e.g., performer substitutions, slight time adjustments).</li>
            <li>Failure to submit a refund request within the specified timeframe.</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <FaEnvelope className="mr-2" /> Contact Us
          </h2>
          <p className="text-gray-300">
            For questions about our Return and Refund Policy, please reach out:
          </p>
          <ul className="list-none text-gray-300 mt-4 space-y-2">
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-purple-600" />
              Email: <a href="mailto:support@abcevantra.com" className="text-purple-600 hover:underline ml-1">support@abcevantra.com</a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-purple-600" />
              Phone: <a href="tel:+91 9999999999" className="text-purple-600 hover:underline ml-1">+91 999 9999 999</a>
            </li>
            <li>Address: SR Nagar, Hyderabad, India - 500038</li>
          </ul>
        </section>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ReturnAndRefund;