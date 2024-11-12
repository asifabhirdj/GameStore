import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <img src={user.profilePicture} alt="Profile" />
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
