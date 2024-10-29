// MovieInputFields.js
import React, { useState } from 'react';
import { db } from '../../TicketConfig'; // Adjust the import based on your project structure
import { collection, addDoc } from 'firebase/firestore';

const MovieInputFields = ({ fetchContents }) => {
  const [contentDetails, setContentDetails] = useState({
    title: '',
    description: '',
    genres: [],
    languages: [],
    format: [],
    releaseDate: '',
    duration: '',
    director: '',
    cast: '',
    rating: '',
    trailerUrl: '',
    posterUrl: '',
    location: [],
    price: '',
    availability: false,
    category: 'Movies',
  });

  const languages = ['English', 'Hindi', 'Marathi', 'Spanish', 'French', 'German', 'Mandarin'];
  const formats = ['Digital', 'Physical(Dvds)', 'Streaming', 'Live', 'Theatre'];
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary', 'Mystery'];
  const categories = ['Movie', 'Event', 'Play'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setContentDetails((prevDetails) => {
        const currentArray = prevDetails[name] || [];
        return {
          ...prevDetails,
          [name]: checked
            ? [...currentArray, value]
            : currentArray.filter((item) => item !== value),
        };
      });
    } else {
      setContentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'contents'), contentDetails);
    // Reset form fields
    setContentDetails({
      title: '',
      description: '',
      genres: [],
      languages: [],
      format: [],
      releaseDate: '',
      duration: '',
      director: '',
      cast: '',
      rating: '',
      trailerUrl: '',
      posterUrl: '',
      location: [],
      price: '',
      availability: false,
      category: 'Movies',
    });
    // Fetch updated contents list
    fetchContents();
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Upload Content</h2>
      <select
        name="category"
        value={contentDetails.category}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={contentDetails.title}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        required
      />
      
      <textarea
        name="description"
        placeholder="Description"
        value={contentDetails.description}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        required
      />

      {/* Genres Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Genres</h3>
        {genres.map((genre) => (
          <div key={genre} className="flex items-center mt-2">
            <input
              type="checkbox"
              id={genre}
              value={genre}
              checked={contentDetails.genres.includes(genre)}
              onChange={handleChange}
              name="genres"
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor={genre} className="text-sm text-gray-700">{genre}</label>
          </div>
        ))}
      </div>

      {/* Additional Input Fields */}
      {/* (Languages, Formats, Locations, etc.) - Add similar sections as above */}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Upload Content
      </button>
    </form>
  );
};

export default MovieInputFields;
