import React, { useState } from 'react';
import { useAuth } from './auth';
import './login.css'; // Importing the login.css file for styling

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Call the login function to get the token and user ID
      console.log('Login successful');
      
      // Extract token and user ID from the response
      const { token, user_id } = response;
      
      // Fetch user data after successful login
      const userData = await fetchUserData(user_id, token);
      displayUserData(userData); // Display the fetched user data
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserData = async (userId, token) => {
    // Log the request including headers
    console.log('Fetching user data request:', {
      url: `https://pyamentflask.replit.app/users`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token in the request headers
        'Content-Type': 'application/json',
      },
    });
  
    const response = await fetch(`https://pyamentflask.replit.app/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token in the request headers
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  };
  
  const displayUserData = (userData) => {
    // Display the user data as needed (e.g., in a modal)
    console.log(userData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
