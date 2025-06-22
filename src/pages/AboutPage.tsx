import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaHandshake, FaStar, FaRocket, FaEnvelope, FaPhone } from "react-icons/fa";
import AboutImg from "../assets/about.png";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";

const AboutPage: React.FC = () => {
  return (
    <div>
    <NavBar/>
    <div className="bg-black text-white min-h-screen">
        <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${AboutImg})` }} >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800">About ABC Evantra</h1>
          <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
            Transforming the way people connect through events. We empower organizers, attendees, and staff to create unforgettable experiences.
          </p>
          <Link
            to="/events"
            className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-4">
              <FaBullseye className="text-purple-600 text-4xl flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-purple-400">Our Mission</h2>
                <p className="mt-2 text-gray-300">
                  To make event planning and attendance seamless, inclusive, and delightful by providing a platform that connects communities through shared experiences.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEye className="text-purple-600 text-4xl flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-purple-400">Our Vision</h2>
                <p className="mt-2 text-gray-300">
                  To be the global leader in event management, fostering connections that inspire, educate, and entertain across cultures and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-400 text-center">Our Story</h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-center">
            Founded in 2020, ABC Evantra started with a simple idea: to simplify event management for everyone. From small community gatherings to large-scale conferences, we’ve grown into a trusted platform used by thousands of organizers and attendees worldwide. Our team is passionate about technology and events, driving us to innovate and deliver exceptional experiences.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-600">10K+</h3>
              <p className="text-gray-400">Events Hosted</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-600">1M+</h3>
              <p className="text-gray-400">Tickets Sold</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-600">50+</h3>
              <p className="text-gray-400">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-400 text-center">Our Core Values</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <FaHandshake className="text-purple-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white">Trust</h3>
              <p className="mt-2 text-gray-400">
                We build trust with secure transactions, reliable support, and transparent communication.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaStar className="text-purple-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white">Excellence</h3>
              <p className="mt-2 text-gray-400">
                We strive for excellence in every feature, from ticketing to event analytics.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaRocket className="text-purple-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white">Innovation</h3>
              <p className="mt-2 text-gray-400">
                We embrace technology to create smarter, faster, and more engaging event solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-400 text-center">Meet Our Team</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-center">
            Our diverse team of event enthusiasts and tech experts is dedicated to making your events a success.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                <img
                src="https://raw.githubusercontent.com/AadityaUoHyd/the-platenet/refs/heads/main/aadi.jpg?auto=format&fit=crop&w=300&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full"
              />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Aaditya B Chatterjee</h3>
              <p className="text-gray-400">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                <img
                src="https://images.unsplash.com/photo-1567784177951-6fa58317e16b??auto=format&fit=crop&w=300&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full"
              />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Amit Bhagat</h3>
              <p className="text-gray-400">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full"
              />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Julie Sharma</h3>
              <p className="text-gray-400">Head of Marketing</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                <img
                src="https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?auto=format&fit=crop&w=300&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full"
              />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Sameer Bhardawaj</h3>
              <p className="text-gray-400">Customer Success Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-purple-400">Get in Touch</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Have questions or need support? Our team is here to help you create amazing events.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="mailto:support@abcevantra.com"
              className="flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
            >
              <FaEnvelope className="mr-2" />
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center bg-transparent border border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              <FaPhone className="mr-2" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default AboutPage;