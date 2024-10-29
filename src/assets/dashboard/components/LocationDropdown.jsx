import React from 'react';

const LocationDropdown = ({ selectedLocation, onLocationChange, onClose,userInfo }) => {
  const handleLocationChange = (event) => {
    onLocationChange(event.target.value); // Pass the selected value to the handler
    onClose(); // Close the dropdown after selection
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-12 absolute right-0 z-10 w-[200px]">
      <div className="flex justify-between items-center text-black">
        <h2 className="text-lg font-semibold">Select Location</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          &times; {/* Close icon */}
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="location" className="block mb-2 text-gray-700">Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange} // Use the new function
          className="p-2 border text-black border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>
    </div>
  );
};

export default LocationDropdown;
