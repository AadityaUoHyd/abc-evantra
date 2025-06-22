import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto sm:max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div>
                <a href="/" className="flex items-center justify-center md:justify-start space-x-2 transform origin-center hover:scale-105 transition duration-200">
                  <img src={LogoImg} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold text-purple-600">ABC Evantra</h2>
                </a>
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Connecting people through unforgettable events. Discover, organize, and attend with ease.
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center md:justify-start space-x-3 sm:space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                  <FaTwitter size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                  <FaFacebook size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                  <FaInstagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                  <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Developed by -{" "}
                <a
                  href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500 hover:text-yellow-600 transition-colors duration-200"
                >
                  Aaditya B Chatterjee
                </a>
              </p>
            </div>

            {/* Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-purple-600">Company</h3>
              <ul className="mt-2 space-y-1.5 sm:space-y-2">
                <li>
                  <Link to="/" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/return" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Return Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-purple-600">Quick Links</h3>
              <ul className="mt-2 space-y-1.5 sm:space-y-2">
                <li>
                  <Link to="/faq" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="text-sm sm:text-base text-gray-400 hover:text-purple-600">
                    Our Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-purple-600">Contact Us</h3>
              <ul className="mt-2 space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Email: <a href="mailto:support@abcevantra.com" className="hover:text-purple-600">support@abcevantra.com</a></li>
                <li>Phone: <a href="tel:+919999999999" className="hover:text-purple-600">+91 999-9999-999</a></li>
                <li>Address: SR Nagar, Hyderabad, India - 500038</li>
              </ul>
            </div>
          </div>
          {/* Final */}
          <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-3 sm:pt-4 flex justify-center text-center text-xs sm:text-sm text-gray-400">
            <p>© {new Date().getFullYear()} ABC Evantra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;