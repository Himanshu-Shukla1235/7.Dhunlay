// File: ./pages/UserProfile/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams(); // Access the dynamic userId from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API using the userId
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile for {userData.name}</h1>
      <p>Email: {userData.email}</p>
      {/* Render other user details as needed */}
    </div>
  );
}

export default UserProfile;
