// components/Filters.js
import React, { useState } from 'react';

const Filters = ({ onApplyFilters }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const languages = ['English', 'Hindi', 'Marathi', 'Spanish', 'French', 'German', 'Mandarin'];
  const formats = ['Digital', 'Physical', 'Streaming', 'Live'];
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary'];

  const handleCheckboxChange = (setFunction, value) => {
    setFunction((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      languages: selectedLanguages,
      formats: selectedFormats,
      genres: selectedGenres,
      category: selectedCategory,
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Movies</option>
            <option>Events</option>
            <option>Plays</option>
          </select>
        </div>

        {/* Languages Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Languages</label>
          {languages.map((language) => (
            <div key={language} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={language}
                checked={selectedLanguages.includes(language)}
                onChange={() => handleCheckboxChange(setSelectedLanguages, language)}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={language} className="text-sm text-gray-700">{language}</label>
            </div>
          ))}
        </div>

        {/* Formats Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Formats</label>
          {formats.map((format) => (
            <div key={format} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={format}
                checked={selectedFormats.includes(format)}
                onChange={() => handleCheckboxChange(setSelectedFormats, format)}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={format} className="text-sm text-gray-700">{format}</label>
            </div>
          ))}
        </div>

        {/* Genres Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Genres</label>
          {genres.map((genre) => (
            <div key={genre} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleCheckboxChange(setSelectedGenres, genre)}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={genre} className="text-sm text-gray-700">{genre}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button onClick={handleApply} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
