import React, { useState } from 'react';
import UserProfile from './UserProfile'; 
import LocationDropdown from './LocationDropdown'; 

const Navbar = ({ userInfo, selectedLocation, onLocationChange, onSearch, searchResults }) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(prev => !prev);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(prev => !prev);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  const closeLocationDropdown = () => {
    setLocationDropdownOpen(false);
  };

  const handleLocationChange = (location) => {
    if (onLocationChange) {
      onLocationChange(location);
    }
    closeLocationDropdown(); 
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white relative z-20">
      <h1 className="text-2xl font-cursive">BookMyTickets</h1>
      
      <div className="flex-grow mx-6 relative">
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays, Sports and Activities"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="w-3/4 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        />
        {searchQuery && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-opacity-90 backdrop-blur-xl shadow-lg p-4 rounded-lg mt-2 z-10 text-black w-80">
            <h3 className="font-semibold text-lg mb-2">Search Results:</h3>
            <ul className="max-h-48 overflow-y-auto">
              {searchResults.map(movie => (
                <li key={movie.id} className="flex items-center py-2 hover:bg-gray-200 cursor-pointer rounded p-1">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-12 w-8 mr-3 rounded"
                  />
                  <span>{movie.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button onClick={toggleLocationDropdown} className="flex items-center hover:text-indigo-300">
            {selectedLocation} <span className="ml-1">▼</span>
          </button>
          {isLocationDropdownOpen && (
            <LocationDropdown
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange} 
              onClose={closeLocationDropdown}
              userInfo={userInfo}
            />
          )}
        </div>

        <div className="ml-6 relative flex mt-2">
          <span className='mt-1'>Hi, {userInfo && userInfo.name ? userInfo.name : "Guest"}</span>
          {userInfo && userInfo.profilePhoto ? (
            <img
              src={userInfo.profilePhoto}
              alt="User Profile"
              className="h-10 w-10 rounded-full cursor-pointer ml-2"
              onClick={toggleProfileDropdown}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-400 cursor-pointer ml-2" onClick={toggleProfileDropdown}></div>
          )}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black p-4 rounded-lg shadow-lg z-50">
              <UserProfile userInfo={userInfo} onClose={closeProfileDropdown} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
