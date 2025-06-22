import { FaLock, FaShieldAlt, FaUserShield, FaFileContract } from "react-icons/fa";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
    <NavBar/>
    
    <div className="bg-black text-white min-h-screen py-12">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 flex items-center justify-center">
            <FaLock className="mr-2" /> Privacy Policy & Terms
          </h1>
          <p className="mt-4 text-gray-300">
            Last updated: June, 2025
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Introduction</h2>
          <p className="text-gray-300">
            At ABC Evantra, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our event management platform, including our website, mobile apps, and services. By using our services, you agree to the terms outlined in this policy and our Terms and Conditions below.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <FaUserShield className="mr-2" /> Information We Collect
          </h2>
          <p className="text-gray-300 mb-4">
            We collect information to provide and improve our services. The types of data we collect include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, billing details, and account credentials when you register or purchase tickets.</li>
            <li><strong>Event Data:</strong> Information about events you create or attend, including preferences and feedback.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device information, and interactions with our platform (e.g., pages visited, clicks).</li>
            <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance user experience and track usage patterns. You can manage cookie preferences in your browser.</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">
            We use your data to deliver a seamless event experience, including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Processing ticket purchases and event registrations.</li>
            <li>Sending event updates, confirmations, and reminders.</li>
            <li>Personalizing your experience with tailored event recommendations.</li>
            <li>Improving our platform through analytics and feedback.</li>
            <li>Complying with legal obligations and preventing fraud.</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Data Sharing</h2>
          <p className="text-gray-300 mb-4">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Event Organizers:</strong> To facilitate event attendance and communication.</li>
            <li><strong>Service Providers:</strong> Third-party vendors (e.g., payment processors, email services) who assist in delivering our services.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Data Security</h2>
          <p className="text-gray-300">
            We implement industry-standard security measures, including encryption and access controls, to protect your data. However, no system is completely secure, and we encourage you to use strong passwords and safeguard your account.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Your Rights</h2>
          <p className="text-gray-300 mb-4">
            Depending on your location, you may have rights regarding your data, including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Accessing or correcting your personal information.</li>
            <li>Requesting deletion of your data.</li>
            <li>Opting out of marketing communications.</li>
            <li>Restricting or objecting to certain data processing.</li>
          </ul>
          <p className="text-gray-300 mt-4">
            To exercise these rights, contact us at <a href="mailto:support@abcevantra.com" className="text-purple-600 hover:underline">support@abcevantra.com</a>.
          </p>
        </section>

        {/* Terms and Conditions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <FaFileContract className="mr-2" /> Terms and Conditions
          </h2>
          <p className="text-gray-300 mb-4">
            By using ABC Evantra, you agree to the following terms:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our services.</li>
            <li><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and for all activities under it.</li>
            <li><strong>Prohibited Conduct:</strong> You may not use our platform for illegal activities, harassment, or distributing harmful content.</li>
            <li><strong>Event Policies:</strong> Event organizers set their own ticket and refund policies, which you agree to follow when purchasing tickets.</li>
            <li><strong>Content Ownership:</strong> You retain ownership of content you submit (e.g., event descriptions), but grant us a license to use it for platform purposes.</li>
            <li><strong>Termination:</strong> We may suspend or terminate your account for violating these terms.</li>
            <li><strong>Limitation of Liability:</strong> ABC Evantra is not liable for damages arising from your use of our services, including event cancellations or technical issues.</li>
            <li><strong>Changes to Terms:</strong> We may update these terms periodically. Continued use constitutes acceptance of the updated terms.</li>
          </ul>
          <p className="text-gray-300 mt-4">
            For full details, contact us at <a href="mailto:support@abcevantra.com" className="text-purple-600 hover:underline">support@abcevantra.com</a>.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <FaShieldAlt className="mr-2" /> Contact Us
          </h2>
          <p className="text-gray-300">
            If you have questions about our Privacy Policy or Terms and Conditions, please reach out:
          </p>
          <ul className="list-none text-gray-300 mt-4 space-y-2">
            <li>Email: <a href="mailto:support@abcevantra.com" className="text-purple-600 hover:underline">support@abcevantra.com</a></li>
            <li>Phone: <a href="tel:+91 999-9999-999" className="text-purple-600 hover:underline">+91 999-9999-999</a></li>
            <li>Address: SR Nagar, Hyderabad, India - 500038</li>
          </ul>
        </section>
        
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default PrivacyPolicy;