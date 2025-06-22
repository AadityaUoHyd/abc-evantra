import React from "react";
import { FaUser, FaHeart, FaComment, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const ongoingDiscussions = [
  {
    id: 1,
    event: "Hyderabad Music Fest 2025",
    user: "Priya Sharma",
    comment:
      "So excited for the lineup this year! Anyone know if there’s a shuttle service to the venue?",
    likes: 23,
    comments: 5,
    date: "June 15, 2025",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    event: "Tech Summit Hyderabad",
    user: "Rahul Kumar",
    comment:
      "Looking forward to the AI workshops. Has anyone attended last year’s summit? Thoughts?",
    likes: 15,
    comments: 8,
    date: "June 16, 2025",
    image: "https://images.unsplash.com/photo-1560439514-07abbb294a86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    event: "Art & Culture Expo 2025",
    user: "Sneha Patel",
    comment:
      "Can’t wait to see the local artists’ showcases! Any recommendations for must-see booths?",
    likes: 18,
    comments: 3,
    date: "June 14, 2025",
    image: "https://images.unsplash.com/photo-1648026141711-4837b280524c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    event: "Food Festival Delhi",
    user: "Aman Gupta",
    comment:
      "Hoping for more street food stalls this time! Last year’s chaat was amazing. Suggestions?",
    likes: 30,
    comments: 10,
    date: "June 13, 2025",
    image: "https://images.unsplash.com/photo-1551883738-19ffa3dc4c43?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const pastDiscussions = [
  {
    id: 1,
    event: "New Year Bash 2024",
    user: "Anita Reddy",
    comment:
      "Amazing event! The fireworks were a highlight, but parking was a hassle. Hope they improve it next time.",
    likes: 45,
    comments: 12,
    date: "Jan 5, 2024",
    image: "https://images.unsplash.com/photo-1694626007231-ebb69f6599e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    event: "Food & Wine Expo 2024",
    user: "Vikram Singh",
    comment:
      "Loved the variety of stalls, especially the Italian section. Would love more vegan options next year!",
    likes: 32,
    comments: 9,
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1641147942314-49d96e8a639a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    event: "Tech Hackathon 2024",
    user: "Neha Joshi",
    comment:
      "The coding challenges were intense! My team came 2nd. Any tips for preparing for next year?",
    likes: 28,
    comments: 7,
    date: "Feb 20, 2024",
    image: "https://images.unsplash.com/photo-1731160807880-daf859b64420?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    event: "Mumbai Jazz Festival 2024",
    user: "Rohan Mehra",
    comment:
      "Incredible performances! The outdoor stage setup was perfect. Hoping for more international artists next time.",
    likes: 50,
    comments: 15,
    date: "Apr 15, 2024",
    image: "https://images.unsplash.com/photo-1593437783747-66ed2e10a9af?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const topContributors = [
  { id: 1, name: "Priya Sharma", events: 12, comments: 45, avatar: "https://plus.unsplash.com/premium_photo-1661672096241-647e43243ed7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Rahul Kumar", events: 10, comments: 38, avatar: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Anita Reddy", events: 8, comments: 30, avatar: "https://images.unsplash.com/photo-1748163257226-e0cfba70925f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const EvantraCommunity: React.FC = () => {
  const [email, setEmail] = React.useState("");

  const handleJoinCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log("Join community with email:", email);
    setEmail("");
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="relative mb-16 sm:mb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-gray-900/90 -z-10" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-400 tracking-tight mb-4 sm:mb-6 animate-fade-in">
            Welcome to the Evantra Community
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Connect with event enthusiasts, share your experiences, and get the latest updates on your favorite events. Join the conversation today!
          </p>
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold transition-colors duration-300 shadow-lg"
          >
            <Link to="/events">Explore Events Now</Link>
          </Button>
        </section>

        {/* Ongoing Events Discussions */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 sm:mb-8">
            Ongoing Events Discussions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[360px] flex flex-col"
              >
                <div className="h-40 overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={discussion.image}
                    alt={discussion.event}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center mb-3">
                  <FaUser className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-gray-200">{discussion.user}</span>
                  <span className="text-xs text-gray-500 ml-auto">{discussion.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 min-h-[48px]">
                  {discussion.event}
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {discussion.comment}
                </p>
                <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">
                  <div className="flex items-center">
                    <FaHeart className="w-4 h-4 mr-1 hover:text-red-500 cursor-pointer" />
                    <span>{discussion.likes}</span>
                    <FaComment className="w-4 h-4 ml-4 mr-1 hover:text-blue-500 cursor-pointer" />
                    <span>{discussion.comments}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-purple-400 border-purple-400 hover:bg-purple-600 hover:text-white text-xs px-3 py-1"
                  >
                    Join Discussion
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Feedback */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 sm:mb-8">
            Past Events Feedback
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[360px] flex flex-col"
              >
                <div className="h-40 overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={discussion.image}
                    alt={discussion.event}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center mb-3">
                  <FaUser className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-gray-200">{discussion.user}</span>
                  <span className="text-xs text-gray-500 ml-auto">{discussion.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 min-h-[48px]">
                  {discussion.event}
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {discussion.comment}
                </p>
                <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">
                  <div className="flex items-center">
                    <FaHeart className="w-4 h-4 mr-1 hover:text-red-500 cursor-pointer" />
                    <span>{discussion.likes}</span>
                    <FaComment className="w-4 h-4 ml-4 mr-1 hover:text-blue-500 cursor-pointer" />
                    <span>{discussion.comments}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-purple-400 border-purple-400 hover:bg-purple-600 hover:text-white text-xs px-3 py-1"
                  >
                    View Feedback
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Contributors Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 sm:mb-8 text-center">
            Meet Our Top Contributors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topContributors.map((contributor) => (
              <div
                key={contributor.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{contributor.name}</h3>
                  <p className="text-sm text-gray-300">
                    {contributor.events} Events • {contributor.comments} Comments
                  </p>
                  <div className="flex items-center mt-2">
                    <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-200">Top Contributor</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Community CTA */}
        <section className="bg-purple-600 py-16 text-center rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-wide">
            Become Part of Our Community
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Sign up to share your event experiences, connect with others, and stay updated on the latest events!
          </p>
          <form onSubmit={handleJoinCommunity} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center justify-center">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white text-gray-900 w-full pl-4 pr-4 py-3 rounded-full border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
            <Button
              type="submit"
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold transition-colors duration-200"
            >
              Join Now
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EvantraCommunity;