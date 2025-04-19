import React, { useState } from 'react';
import { FaUser , FaEnvelope, FaMobileAlt, FaLock, FaCheck } from 'react-icons/fa';
import './Register.css';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email && !mobile) newErrors.contact = 'Email or mobile is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreed) newErrors.agreed = 'You must agree to terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Get users array from localStorage or initialize empty
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      setErrors({ ...errors, email: 'An account with this email already exists.' });
      return;
    }

    const newUser = {
      name,
      email,
      mobile,
      password: btoa(password),
      token: 'dummy-token-123456', // dummy token for authentication
      timestamp: new Date().getTime()
    };

    // Add new user to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set current logged-in user email
    localStorage.setItem('currentUserEmail', email);

    setSuccess(true);
  };

  return (
    <>  
    <Header/>
      <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-subtitle">Register to access personalized services and exclusive offers</p>

        {success ? (
          <div className="success-message">
            <FaCheck className="success-icon" /> 
            <span>Account created successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <div className="input-group">
                <FaUser  className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaMobileAlt className="input-icon" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`form-input ${errors.contact ? 'input-error' : ''}`}
                />
              </div>
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
              </div>
              { errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group agreement-group">
              <div className="agreement">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="agreement-checkbox"
                />
                <label htmlFor="agree" className="agreement-label">
                  I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreed && <span className="error-message">{errors.agreed}</span>}
            </div>

            <div className="form-group">
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </form>
        )}

        <div className="login-redirect">
          Already registered? <Link to="/login" className="login-link">Log in</Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
