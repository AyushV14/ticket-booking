import React, { useState } from 'react';
import { db, storage } from '../../TicketConfig'; // Import your Firestore and Storage
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileForm = ({ user, onProfileComplete }) => {
  const [location, setLocation] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePhotoUrl = '';

    if (profilePhoto) {
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      await uploadBytes(storageRef, profilePhoto);
      profilePhotoUrl = await getDownloadURL(storageRef);
    }

    const userInfoData = {
      name: user.displayName,
      email: user.email,
      location,
      profilePhoto: profilePhotoUrl,
    };

    await setDoc(doc(db, 'UserInfo', user.uid), userInfoData);
    onProfileComplete(userInfoData); // Notify the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Photo:</label>
        <input 
          type="file" 
          onChange={handleProfilePhotoChange} 
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 transition-colors duration-300 hover:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input 
          type="text" 
          value={user.displayName} 
          readOnly 
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-200 cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input 
          type="email" 
          value={user.email} 
          readOnly 
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-gray-200 cursor-not-allowed"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Location:</label>
        <select 
          required 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 transition-colors duration-300 hover:border-indigo-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Banglore">Banglore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-2 rounded transition duration-300 hover:bg-indigo-700 transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileForm;
