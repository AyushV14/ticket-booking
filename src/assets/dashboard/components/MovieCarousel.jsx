import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons


const MovieCarousel = ({ posters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Automatically move to the next slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500); // Time for the transition (matches CSS transition duration)
  };

  const nextSlide = () => {
    handleSlideChange((currentIndex + 1) % posters.length);
  };

  const prevSlide = () => {
    handleSlideChange(currentIndex === 0 ? posters.length - 1 : currentIndex - 1);
  };

  return (
    <div className="relative w-full overflow-hidden mt-7">
      <div className="flex justify-center items-center space-x-4">
        {/* Previous poster preview */}
        <div
          className={`w-1/3 opacity-50 transform transition-transform duration-500 ${
            isTransitioning ? 'scale-75' : 'scale-90'
          }`}
          onClick={prevSlide}
        >
          <img
            src={posters[currentIndex === 0 ? posters.length - 1 : currentIndex - 1]}
            alt="Previous poster"
            className="rounded-lg cursor-pointer h-[300px] w-[400px] object-cover"
          />
        </div>

        {/* Current Poster */}
        <div
          className={`w-1/2 transform transition-transform duration-500 ${
            isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}
        >
          <img
            src={posters[currentIndex]}
            alt="Current poster"
            className="rounded-lg shadow-lg transition-opacity duration-500 h-[400px] w-[600px] object-contain"
          />
          {/* Action buttons */}
          <div className="absolute bottom-4 left-6 bg-white text-black px-4 py-2 rounded-lg shadow-lg font-semibold">
            <a href="#" className="hover:underline">
              Book Movie Tickets &#x2192;
            </a>
          </div>
        </div>

        {/* Next poster preview */}
        <div
          className={`w-1/3 opacity-50 transform transition-transform duration-500 ${
            isTransitioning ? 'scale-75' : 'scale-90'
          }`}
          onClick={nextSlide}
        >
          <img
            src={posters[(currentIndex + 1) % posters.length]}
            alt="Next poster"
            className="rounded-lg cursor-pointer h-[300px] w-[400px] object-cover"
          />
        </div>
      </div>

      {/* Left arrow button */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-md focus:outline-none transition duration-200 hover:bg-indigo-700"
        onClick={prevSlide}
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow button */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-md focus:outline-none transition duration-200 hover:bg-indigo-700"
        onClick={nextSlide}
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MovieCarousel;
