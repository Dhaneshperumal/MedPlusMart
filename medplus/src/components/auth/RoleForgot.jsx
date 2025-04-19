import { useState } from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './ForgotPassword.css';

const RoleForgot = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Determine back to login link based on current path
  let backToLoginLink = '/adminlogin';
  if (location.pathname === '/pharmaforgot') {
    backToLoginLink = '/pharmalogin';
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="card-header">
          <h2>Reset Your Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="input-group">
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@example.com'
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h3>Check your email</h3>
            <p>
              We've sent a password reset link to your {email}
            </p>
          </div>
        )}

        <div className="back-to-login">
          <a href={backToLoginLink}>
            <FaArrowLeft /> Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoleForgot;
