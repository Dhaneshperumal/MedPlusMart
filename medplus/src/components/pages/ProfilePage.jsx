import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../../services/auth';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [_, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setName(userData.name || '');
      setAddress(userData.address || '');
      setContact(userData.contact || '');
    }
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Simulate saving changes
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <h1>Manage Your Profile Information</h1>
      <div className="profile-section">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="profile-section">
        <label>Address:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />
      </div>
      <div className="profile-section">
        <label>Contact:</label>
        <input 
          type="tel" 
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
          required 
        />
      </div>
      <div className="profile-section">
        <label>Profile Picture:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePictureChange} 
        />
        {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
      </div>
      <div className="profile-buttons">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={() => { setName(''); setAddress(''); setContact(''); setProfilePicture(null); setPreview(null); }}>Cancel</button>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      {message && <p className="success-message">{message}</p>}
      <footer className="footer">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default ProfilePage;
