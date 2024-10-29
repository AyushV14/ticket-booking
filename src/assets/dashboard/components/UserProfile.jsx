import React from 'react';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userInfo, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          &times; {/* Close icon */}
        </button>
      </div>
      <div className="mt-4">
        <p>Name: {userInfo?.name || 'N/A'}</p>
        <p>Email: {userInfo?.email || 'N/A'}</p>
        <p>Location: {userInfo?.location || 'N/A'}</p>
        {userInfo?.profilePhoto && (
          <img src={userInfo.profilePhoto} alt="Profile" className="mt-2 h-20 w-20 rounded-full" />
        )}
        <div className='flex gap-2'>
          <button className="mt-2 p-2 bg-blue-600 text-white rounded-lg">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="mt-2 p-2 bg-blue-600 text-white rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
