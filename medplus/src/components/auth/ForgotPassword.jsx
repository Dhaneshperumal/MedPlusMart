import { useState } from 'react';
import { FaEnvelope, FaMobileAlt, FaArrowLeft } from 'react-icons/fa';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isEmailMethod, setIsEmailMethod] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isEmailMethod && !email) {
      setError('Please enter your email address');
      return;
    }
    if (!isEmailMethod && !mobile) {
      setError('Please enter your mobile number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="card-header">
          <h2>Reset Your Password</h2>
          <p>Enter your email or mobile to receive a reset link</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="method-toggle">
              <button
                type="button"
                className={`toggle-btn ${isEmailMethod ? 'active' : ''}`}
                onClick={() => setIsEmailMethod(true)}
              >
                <FaEnvelope /> Email
              </button>
              <button
                type="button"
                className={`toggle-btn ${!isEmailMethod ? 'active' : ''}`}
                onClick={() => setIsEmailMethod(false)}
              >
                <FaMobileAlt /> Mobile
              </button>
            </div>

            <div className="input-group">
              <label htmlFor={isEmailMethod ? 'email' : 'mobile'}>
                {isEmailMethod ? 'Email Address' : 'Mobile Number'}
              </label>
              <input
                type={isEmailMethod ? 'email' : 'tel'}
                id={isEmailMethod ? 'email' : 'mobile'}
                value={isEmailMethod ? email : mobile}
                onChange={(e) => 
                  isEmailMethod 
                    ? setEmail(e.target.value) 
                    : setMobile(e.target.value)
                }
                placeholder={
                  isEmailMethod 
                    ? 'name@example.com' 
                    : '+91 9876543210'
                }
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
                isEmailMethod ? 'Send Reset Link' : 'Send OTP'
              )}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h3>Check your {isEmailMethod ? 'email' : 'mobile'}</h3>
            <p>
              We've sent a {isEmailMethod ? 'password reset link' : 'OTP'} to your{' '}
              {isEmailMethod ? email : mobile}
            </p>
          </div>
        )}

        <div className="back-to-login">
          <a href="/login">
            <FaArrowLeft /> Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
