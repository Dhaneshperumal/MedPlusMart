import { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import '../auth/ForgotPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
    <div className="reset-password-container" style={{backgroundColor:'white'}}>
      <div className="reset-password-card">
        <div className="card-header">
          <h2>Set a New Password</h2>
          <p>Enter and confirm your new password</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? <span className="spinner"></span> : <><FaLock /> Reset Password</>}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h3>Password Reset Successful</h3>
            <p>You can now log in with your new password</p>
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

export default ResetPassword;
