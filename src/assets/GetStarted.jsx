import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-cursive">BookMyTickets</h1>
        <ul className="flex list-none">
          <li className="ml-6"><a href="/" className="hover:text-indigo-300">Home</a></li>
          <li className="ml-6"><a href="#features" className="hover:text-indigo-300">Features</a></li>
          <li className="ml-6"><a href="#footer" className="hover:text-indigo-300">About</a></li>
        </ul>
        <div className="flex gap-4">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded transition duration-300 hover:bg-indigo-700" 
          onClick={handleGetStarted}>Login</button>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded transition duration-300 hover:bg-indigo-700" 
          onClick={handleGetStarted}>Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <header className="text-center p-20 bg-purple-50 flex-1">
        <h1 className="text-3xl font-bold">BookMyTickets</h1>
        <p className="text-gray-600 mt-4">Your go-to place for booking movie and event tickets with ease!</p>
        <div className="mt-8">
          <button 
            className="bg-indigo-600 text-white py-3 px-6 text-lg rounded transition duration-300 hover:bg-indigo-700"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          <p className="mt-4">
            Already have an account? <a href="#login" className="text-indigo-600 hover:underline">Login</a>
          </p>
        </div>
      </header>

      {/* Section 2 - Functionality */}
      <section id="features" className="bg-gray-200 p-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Exciting Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book movie or event tickets with a few simple steps.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">Area-Specific Selections</h3>
            <p className="text-gray-600">Choose tickets based on your current location.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">Real-Time Availability</h3>
            <p className="text-gray-600">Get up-to-date information on available seats.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">Payment Gateway</h3>
            <p className="text-gray-600">Secure and easy payment options.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">Event Listings</h3>
            <p className="text-gray-600">Find the latest movie or event details at your fingertips.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl mb-2">More to Come</h3>
            <p className="text-gray-600">Additional features will be rolled out soon.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4" id='footer'>
        <p>Made by Ayush Vikharankar - <span className="font-bold">Fast, Reliable Ticket Booking</span></p>
        <p>All rights reserved to @Ayush Vikharankar</p>
      </footer>
    </div>
  );
};

export default GetStarted;
