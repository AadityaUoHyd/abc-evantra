import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const FAQs: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I purchase tickets for an event?",
      answer:
        "Browse events on the Home page, select an event, and click 'Buy Tickets'. Follow the prompts to choose your ticket type, enter payment details, and confirm. You'll receive a QR code via email.",
    },
    {
      id: 2,
      question: "Can I get a refund for my ticket?",
      answer:
        "Refunds are available within 7 days of purchase or if the event is canceled. Visit the 'Return & Refund Policy' page for details or contact support@abcevantra.com.",
    },
    {
      id: 3,
      question: "How do I create an event on ABC Evantra?",
      answer:
        "Sign in as an Organizer, go to 'Create Event' in your dashboard, fill out the event details (title, date, location, etc.), and publish. Your event will be live after review.",
    },
    {
      id: 4,
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your data. Read our Privacy Policy for more details on how we handle your information.",
    },
    {
      id: 5,
      question: "How can I contact support?",
      answer:
        "Reach us at support@abcevantra.com or call +91 999-9999-999. Support is available 24/7 to assist with any issues.",
    },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-600 mb-6 sm:mb-8">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-700 rounded-lg mb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full justify-between items-center p-4 text-left text-base sm:text-lg font-medium text-gray-300 hover:text-purple-600 transition-colors"
                aria-expanded={openFAQ === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                {openFAQ === faq.id ? (
                  <BiMinus className="w-5 h-5" />
                ) : (
                  <BsPlusLg className="w-5 h-5" />
                )}
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`${
                  openFAQ === faq.id ? "block" : "hidden"
                } px-4 pb-4 text-sm sm:text-base text-gray-400 transition-all duration-300`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;