import React from 'react';

const FooterDashboard = () => {
  const keywords = [
    "24/7 Customer Care",
    "Instant Booking",
    "Secure Payments",
    "Best Price Guarantee",
    "User-Friendly Interface",
    "Exclusive Deals",
    "Mobile Tickets",
    "Easy Refunds",
    "Real-Time Updates",
    "Loyalty Rewards",
    "Event Notifications"
  ];

  const renderKeywords = () => {
    return keywords.map((keyword, index) => (
      <span key={index} className="bg-gray-700 rounded-full px-3 py-1 text-sm">
        {keyword}
      </span>
    ));
  };

  return (
    <div className="bg-gray-800 text-white p-6 mt-8">
      {/* Top Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="text-lg text-center">
          <h2 className="font-semibold text-2xl">List Your Shows</h2>
          <p className="text-sm mt-2">Reach millions of viewers and maximize your ticket sales.</p>
        </div>
        <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 mt-4">
          Contact Today!
        </button>
      </div>

      {/* Keywords Section */}
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        {renderKeywords()}
      </div>

      {/* Divider with Logo */}
      <div className="flex items-center justify-center mb-4">
        <hr className="w-full border-gray-600" />
        <h1 className="text-2xl font-cursive mx-4">BookMyTickets</h1>
        <hr className="w-full border-gray-600" />
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 p-4 border-t border-gray-600">
        <p className="text-m">Copyright © Made by <strong>Ayush Vikharankar</strong> - Fast, Reliable Ticket Booking</p>
        <p className="text-m">All rights reserved to <strong>@Ayush Vikharankar</strong></p>
        <p className="text-m">Your gateway to <span className="font-semibold">unforgettable experiences</span>.</p>
        <p className="text-m">Join us and explore the world of <span className="font-semibold">entertainment</span>!</p>
      </div>

    </div>
  );
};

export default FooterDashboard;
