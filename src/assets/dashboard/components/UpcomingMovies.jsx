// components/UpcomingMovies.js
import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../TicketConfig'; // Adjust the import path as necessary

const UpcomingMovies = () => {
  const scrollRef = useRef(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Fetch movies from Firestore
  const fetchUpcomingMovies = async () => {
    const moviesCollection = collection(db, 'contents'); // Change 'movies' to your collection name
    const movieSnapshot = await getDocs(moviesCollection);
    const movieList = movieSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get current date
    const currentDate = new Date();

    // Filter for upcoming movies
    const filteredMovies = movieList.filter(movie => new Date(movie.releaseDate) > currentDate);
    setUpcomingMovies(filteredMovies);
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="bg-gray-200 p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-[600] text-black text-center mb-6">Exciting Releases Ahead!</h2>
      <div className="relative">
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-l-lg hover:bg-indigo-700 transition duration-200 z-10">
          &lt; {/* Left Arrow */}
        </button>
        <div ref={scrollRef} className="flex overflow-x-scroll scrollbar-hide">
          {upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-white rounded-lg shadow-lg flex-shrink-0 w-64 transition-transform transform hover:scale-105 mx-4">
                <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-gray-600">{movie.genre}</p>
                  <p className="text-gray-500">Rating: {movie.rating}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">No upcoming movies at this time.</p>
          )}
        </div>
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700 transition duration-200 z-10">
          &gt; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default UpcomingMovies;
