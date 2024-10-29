import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <p>No movies available for this location.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          className="bg-white w-[300px] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-48 object-contain" 
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-gray-600">{movie.genres.join(', ')}</p>
            <p className="text-gray-500">Rating: {movie.rating}</p>
            <Link to={`/movie/${movie.id}`}>
            <div className="mt-4">
              <hr className="border-gray-300" />
              
              <button 
                className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
                Book Ticket
              </button>
              
            </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
