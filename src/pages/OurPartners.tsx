import React from "react";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";

const OurPartners: React.FC = () => {
  const partners = [
    {
      name: "Zomato",
      logoUrl: "https://images.seeklogo.com/logo-png/35/1/zomato-logo-png_seeklogo-354338.png",
      description: "Powers event dining promotions and food stall integrations.",
    },
    {
      name: "OYO",
      logoUrl: "https://images.seeklogo.com/logo-png/44/1/oyo-rooms-logo-png_seeklogo-443633.png",
      description: "Provides exclusive accommodation deals for event attendees.",
    },
    {
      name: "Mastercard",
      logoUrl: "https://images.seeklogo.com/logo-png/8/1/master-card-logo-png_seeklogo-89117.png",
      description: "Ensures secure, seamless payment processing for tickets.",
    },
    {
      name: "RedBus",
      logoUrl: "https://images.seeklogo.com/logo-png/48/1/redbus-logo-png_seeklogo-483976.png",
      description: "Facilitates travel bookings for outstation event-goers.",
    },
    {
      name: "Ola",
      logoUrl: "https://images.seeklogo.com/logo-png/30/1/ola-logo-png_seeklogo-306525.png",
      description: "Offers reliable transport to and from event venues.",
    },
    {
      name: "Bisleri",
      logoUrl: "https://images.seeklogo.com/logo-png/23/1/bisleri-logo-png_seeklogo-237556.png",
      description: "Supplies hydration solutions for large-scale events.",
    },
    {
      name: "Paytm",
      logoUrl: "https://images.seeklogo.com/logo-png/30/1/paytm-logo-png_seeklogo-305549.png",
      description: "Enables quick, cashless payments and cashback offers.",
    },
    {
      name: "Uber",
      logoUrl: "https://images.seeklogo.com/logo-png/29/1/uber-logo-png_seeklogo-299630.png",
      description: "Provides convenient ride options for attendees.",
    },
    {
      name: "Swiggy",
      logoUrl: "https://images.seeklogo.com/logo-png/34/1/swiggy-logo-png_seeklogo-348257.png",
      description: "Delivers food options to event venues and attendees.",
    },
    {
      name: "Amazon Pay",
      logoUrl: "https://images.seeklogo.com/logo-png/42/1/amazon-pay-logo-png_seeklogo-425648.png",
      description: "Streamlines ticket purchases with trusted payments.",
    },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4">
            Our Trusted Partners
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-6">
            We collaborate with industry leaders to deliver exceptional event experiences, from ticketing and payments to travel and dining.
          </p>
        </section>

        {/* Partner Logos Grid */}
        <section className="mb-10 sm:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
              >
                {/* Partner Logo */}
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="w-20 h-12 sm:w-24 sm:h-16 object-contain mb-2"
                />
                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4 sm:mb-6">
            Why Partner with ABC Evantra?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Our partnerships enable us to offer unparalleled services, making events more accessible, secure, and enjoyable for organizers and attendees alike.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurPartners;
