import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../TicketConfig'; 
import Navbar from '../Navbar'; 
import FooterDashboard from '../FooterDashboard';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const MovieDetails = ({ userInfo, selectedLocation, onLocationChange, onSearch, searchResults }) => {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [reviews, setReviews] = useState(0); // Placeholder for total reviews

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDoc = doc(db, 'contents', id);
      const docSnap = await getDoc(movieDoc);

      if (docSnap.exists()) {
        setMovie(docSnap.data());
        // Initialize likes and dislikes if available
        setLikes(docSnap.data().likes || 0);
        setDislikes(docSnap.data().dislikes || 0);
        setReviews(docSnap.data().reviews || 0); // Assuming you have a reviews field
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId.split('&')[0]}`;
    }
    return '';
  };

  const handleLike = () => {
    setLikes(likes + 1);
    // Update Firestore with new likes count if needed
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    // Update Firestore with new dislikes count if needed
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (!movie) return <div className="text-center text-xl">No movie found!</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar 
        userInfo={userInfo} 
        selectedLocation={selectedLocation}
        onLocationChange={onLocationChange} 
        onSearch={onSearch} 
        searchResults={searchResults}
      />
      <button 
        onClick={() => navigate(-1)} // Navigate back
        className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition mt-4 ml-6"
      >
        &larr; Back
      </button>
      <div className="p-6 flex flex-col lg:flex-row">
        {/* Movie Poster */}
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-1/4 my-4 mx-auto lg:mx-0 rounded-lg shadow-lg" 
        />
        
        {/* Movie Details */}
        <div className="lg:ml-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
          <p className="text-gray-700 text-lg mt-4">{movie.description}</p>

          {/* Trailer Section */}
          {movie.trailerUrl && (
            <div className="mt-6">
              <h2 className="text-2xl text-gray-800">Watch the Trailer</h2>
              <iframe 
                src={getEmbedUrl(movie.trailerUrl)} 
                title="Movie Trailer" 
                className="w-full h-64 mt-2 rounded-lg shadow-lg" 
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Like and Dislike Buttons */}
          <div className="flex items-center mt-4">
            <button onClick={handleLike} className="flex items-center mr-4 text-indigo-600">
              <FaThumbsUp className="mr-1" /> {likes}
            </button>
            <button onClick={handleDislike} className="flex items-center text-red-600">
              <FaThumbsDown className="mr-1" /> {dislikes}
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-4">
            <p className="text-gray-600">
              {reviews > 0 ? `${Math.round((likes / (likes + dislikes)) * 100)}% of people loved this movie!` : "Be the first to review this movie!"}
            </p>
          </div>

          {/* Booking Section */}
          <h2 className="text-2xl mt-6 text-gray-800">Book Tickets</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <p className="text-gray-600">Select your preferred date and time:</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <FooterDashboard />
    </div>
  );
};

export default MovieDetails;
