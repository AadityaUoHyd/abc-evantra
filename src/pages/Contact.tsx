import React from "react";
import { FaEnvelope, FaPhone, FaBuilding, FaTicketAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4">
            Connect with ABC Evantra
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-6">
            Whether you're an event organizer looking to streamline ticketing or an attendee needing support, we're here to help. Let’s make your events unforgettable!
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get in Touch
          </a>
        </section>

        {/* Organizer Section */}
        <section className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4 sm:mb-6 text-center">
            For Event Organizers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 flex items-start">
              <FaTicketAlt className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-200 mb-2">
                  Seamless Ticketing
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Partner with us for QR-based ticketing, real-time analytics, and scalable solutions to sell out your events.
                </p>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 flex items-start">
              <FaBuilding className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-200 mb-2">
                  Dedicated Support
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Our team provides 24/7 support to ensure your event runs smoothly, from setup to settlement.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm sm:text-base text-gray-400 mt-6">
            Ready to partner? Contact us to discuss ticketing contracts and boost your event success!
          </p>
        </section>

        {/* Attendee Section */}
        <section className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4 sm:mb-6 text-center">
            For Attendees
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <div className="flex items-center text-gray-400">
              <FaEnvelope className="w-5 h-5 mr-2" />
              <a href="mailto:support@abcevantra.com" className="text-sm sm:text-base hover:text-purple-600">
                support@abcevantra.com
              </a>
            </div>
            <div className="flex items-center text-gray-400">
              <FaPhone className="w-5 h-5 mr-2" />
              <a href="tel:+919999999999" className="text-sm sm:text-base hover:text-purple-600">
                +91 999-9999-999
              </a>
            </div>
            <div className="flex items-center text-gray-400">
              <FaBuilding className="w-5 h-5 mr-2" />
              <span className="text-sm sm:text-base">SR Nagar, Hyderabad, India - 500038</span>
            </div>
          </div>
          <p className="text-center text-sm sm:text-base text-gray-400 mt-6">
            Need help with tickets or events? Reach out to our support team anytime.
          </p>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="max-w-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4 sm:mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm sm:text-base text-gray-300 mb-1">
                I am a...
              </label>
              <select
                id="role"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="organizer">Event Organizer</option>
                <option value="attendee">Attendee</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={5}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;