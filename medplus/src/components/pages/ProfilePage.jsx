import React, { useState, useEffect } from 'react';
import {logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loadUserData = () => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userData = users.find(user => user.email === currentUserEmail) || {};
    setName(userData.name || '');
    setAddress(userData.address || '');
    setEmail(userData.email || '');
    setMobile(userData.mobile || '');
    if (userData.profilePicture) {
      setPreview(userData.profilePicture);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      loadUserData();
    }
    const handleStorageChange = (event) => {
      if (event.key === 'users' || event.key === 'currentUserEmail') {
        loadUserData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handlePictureChange = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Save changes to localStorage
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === currentUserEmail) {
        return {
          ...user,
          name,
          address,
          email,
          mobile,
          profilePicture: preview || user.profilePicture
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // If email changed, update currentUserEmail key
    if (email !== currentUserEmail) {
      localStorage.setItem('currentUserEmail', email);
    }
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <label
              htmlFor="profile-picture"
              className={`upload-label ${isEditing ? '' : 'disabled'}`}
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
            >
              Change Photo
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className={`upload-input ${isEditing ? '' : 'disabled'}`}
              disabled={!isEditing}
              style={{ display: 'none' }}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email address"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="form-input "
              placeholder="Enter your phone number"
              disabled={!isEditing}
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
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditClick}
                className="btn btn-edit"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn btn-save"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
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