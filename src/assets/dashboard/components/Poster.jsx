import React from 'react';

export default function Poster() {
  return (
    <div className="flex justify-center my-20"> {/* Centering the poster */}
      <img 
        src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png" 
        alt="Movie Poster" 
        className="rounded-lg w-[80%]" // Optional: Add styling for rounded corners
      />
    </div>
  );
}
