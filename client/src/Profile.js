import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, isAuthenticated }) => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">Profile</h1>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-yellow-500"
          />
          <h2 className="text-2xl font-semibold text-yellow-300">{user.username}</h2>
          <p className="text-gray-400 mb-4">{user.email}</p>
          
          {/* Profile Info */}
          <div className="bg-gray-900 p-4 rounded-lg mt-6">
            <p className="text-lg mb-3">Posts: {user.postCount}</p>
            <p className="text-lg mb-3">Followers: {user.followers}</p>
            <p className="text-lg mb-3">Following: {user.following}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Link
              to="/edit-profile"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full"
            >
              Edit Profile
            </Link>
            <Link
              to="/home"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
