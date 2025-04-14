import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock, FaCheck } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
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

  const handleSendOtp = () => {
    if (!validateForm()) return;
    // Simulate OTP sending
    setIsOtpSent(true);
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown(prev => prev <= 1 ? (clearInterval(timer), 0) : prev - 1);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm() || !isOtpSent) return;
    
    // Simulate registration
    const userData = {
      name,
      email,
      mobile,
      password: btoa(password), // Basic encoding (replace with proper hashing in production)
      timestamp: new Date().getTime()
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setSuccess(true);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Your Account</h1>
        <p className="subtext">Register to access personalized services and exclusive offers</p>

        {success ? (
          <div className="success-message">
            <FaCheck /> Account created successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <FaMobileAlt className="input-icon" />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            {isOtpSent && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {countdown > 0 ? (
                  <span className="otp-timer">Resend in {countdown}s</span>
                ) : (
                  <button type="button" onClick={handleSendOtp}>Resend OTP</button>
                )}
              </div>
            )}

            <div className="agreement">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
              {errors.agreed && <span className="error">{errors.agreed}</span>}
            </div>

            {!isOtpSent ? (
              <button type="button" onClick={handleSendOtp} className="btn-primary">
                Send OTP
              </button>
            ) : (
              <button type="submit" className="btn-primary">
                Register
              </button>
            )}
          </form>
        )}

        <div className="login-link">
          Already registered? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
