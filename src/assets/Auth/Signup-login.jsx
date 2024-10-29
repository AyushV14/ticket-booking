import React from 'react';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Signuplogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(); 
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-cursive">BookMyTickets</h1>
        <ul className="flex list-none">
          <li className="ml-6"><a href="/" className="hover:text-indigo-300" onClick={() => { navigate('/'); }}>Home</a></li>
          <li className="ml-6"><a href="#features" className="hover:text-indigo-300">Features</a></li>
          <li className="ml-6"><a href="#footer" className="hover:text-indigo-300">About</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <header className="text-center p-20 bg-purple-50 flex-1">
        <h1 className="text-3xl font-bold">Welcome to BookMyTickets</h1>
        <p className="text-gray-600 mt-4">Login or Sign up to book your tickets easily!</p>
        <div className="mt-8 flex justify-center"> {/* Centering the button */}
          <button 
            className="flex items-center justify-center bg-indigo-600 text-white py-3 px-6 text-lg rounded transition duration-300 hover:bg-indigo-700"
            onClick={handleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S6.5 2 12 2z" />
              <path d="M9.5 10.5h5v3h-5v-3z" />
              <path d="M9.5 13.5h5v3h-5v-3z" />
            </svg>
            Login with Google
          </button>
        </div>
        <p className="mt-4">
          Don't have an account? <a href="#signup" className="text-indigo-600 hover:underline" onClick={handleLogin}>Sign Up</a>
        </p>
      </header>

      {/* Section - Our Advantages */}
      <section id="advantages" className="bg-gray-200 p-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Advantages</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our support team is available around the clock to assist you with your booking needs.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">Exclusive Deals</h3>
            <p className="text-gray-600">Get access to exclusive discounts and offers on various events.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">User-Friendly Experience</h3>
            <p className="text-gray-600">Enjoy a seamless booking process with our intuitive platform.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your transactions are protected with industry-leading security measures.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">Custom Alerts</h3>
            <p className="text-gray-600">Receive notifications for your favorite events and ticket availability.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl mb-2">Community Reviews</h3>
            <p className="text-gray-600">Read reviews and ratings from other users to make informed choices.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>Made by Ayush Vikharankar - <span className="font-bold">Fast, Reliable Ticket Booking</span></p>
        <p>All rights reserved to @Ayush Vikharankar</p>
      </footer>
    </div>
  );
};

export default Signuplogin;
