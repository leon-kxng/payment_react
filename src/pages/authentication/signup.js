// signup.js
import React, { useState } from 'react';
import { useAuth } from './auth'; // Import useAuth hook

const Signup = ({ closeModal }) => {
  const { signup } = useAuth(); // Use useAuth hook to access signup function
  const [userData, setUserData] = useState({
    phone_number: '',
    username: '',
    profile_pic_id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      // Call the signup function from useAuth hook
      await signup(userData);
      closeModal(); // Close the modal after successful signup
    } catch (error) {
      // Handle signup error
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" name="phone_number" placeholder="Phone Number" value={userData.phone_number} onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} />
      <input type="text" name="profile_pic_id" placeholder="Profile Pic ID" value={userData.profile_pic_id} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
