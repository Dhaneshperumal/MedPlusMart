import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../../services/auth';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setName(userData.name || '');
      setAddress(userData.address || '');
      setContact(userData.contact || '');
      if (userData.profilePicture) {
        setPreview(userData.profilePicture);
      }
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
    // Save changes to localStorage
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const updatedUser = {
      ...userData,
      name,
      address,
      contact,
      profilePicture: preview
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Manage Your Profile</h1>
        <p className="profile-subtitle">Update your personal information</p>
      </div>

      <div className="profile-content">
        <div className="profile-picture-section">
          <div className="avatar-container">
            {preview ? (
              <img src={preview} alt="Profile" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <span className="avatar-text">{name.charAt(0).toUpperCase() || 'U'}</span>
              </div>
            )}
          </div>
          <div className="picture-upload">
            <label htmlFor="profile-picture" className="upload-label">
              Change Photo
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="upload-input"
            />
          </div>
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="form-input "
              placeholder="Enter your phone number"
            />
          </div>

          {message && (
            <div className="success-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="success-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {message}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-save"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setName('');
                setAddress('');
                setContact('');
                setProfilePicture(null);
                setPreview(null);
              }}
              className="btn btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={logout}
              className="btn btn-logout"
            >
              Logout
            </button>
          </div>
        </form>
      </div>

      <footer className="profile-footer">
        <a href="#" className="footer-link">Terms of Service</a>
        <span className="footer-separator">•</span>
        <a href="#" className="footer-link">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default ProfilePage;