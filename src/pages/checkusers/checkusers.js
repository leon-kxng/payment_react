import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./checkusers.css"

const Checkusers = ({ isOpen, closeModal }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('Fetching user data...');
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        console.log('User data:', data);
        setUserData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const getImageUrl = (profilePicId) => {
    return `http://localhost:5000/images/${profilePicId}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Check Users Modal"
      className="modal" // Applying the modal class
      overlayClassName="overlay" // You can adjust this if needed
    >
      <h2>User Data</h2>
      {userData ? (
        <div className="card-container">
          {userData.map(user => (
            <div key={user.id} className="card">
              <div className="card-avatar">
                {user.profile_pic_id ? (
                  <img 
                    src={getImageUrl(user.profile_pic_id)} 
                    alt={`Profile Pic for ${user.username}`} 
                    style={{ maxWidth: '72px', maxHeight: '72px' }} // Limit image size to 72px
                  />
                ) : (
                  <p>No Profile Picture</p>
                )}
              </div>
              <div className="card-text">
                <h3>User ID: {user.id}</h3>
                <p>Phone Number: {user.phone_number}</p>
                <p>Username: {user.username}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default Checkusers;
