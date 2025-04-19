import { useState } from 'react';
import { FaUser, FaLock, FaMobileAlt, FaEnvelope } from 'react-icons/fa';
import { MdOutlineSms } from 'react-icons/md';
import { MdHealthAndSafety } from 'react-icons/md';
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!mobile) return;
    
    console.log('OTP sent to:', mobile);
    setIsOtpSent(true);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!isOtpLogin) {
      // Email/password login
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email);
      if (!user) {
        setError('No account found with this email.');
        return;
      }
      if (user.password !== btoa(password)) {
        setError('Incorrect password.');
        return;
      }
      // Set current logged-in user email
      localStorage.setItem('currentUserEmail', email);
      // Redirect to home or profile page
      navigate('/');
    } else {
      // OTP login logic (not implemented)
      alert('OTP login not implemented yet.');
    }
  };

  return (
    <>
    <Header/>
    <div className="login-container">
      <div className="login-card">
      
        <div className="card-header">
          <div className="icons-container">
            <MdHealthAndSafety style={{ color: 'white', fontSize: '35px' }} className="category-icons" /> 
          </div>
          <h1 className="text-xl font-bold">Welcome to MedPlusMart</h1>
          <p className="text-blue-100">Please log in to continue</p>
        </div>

        <div className="card-body">
        
          <div className="form-tabs">
            <button
              onClick={() => setIsOtpLogin(false)}
              className={`tab-btn ${!isOtpLogin ? 'active' : ''}`}
            >
              <FaEnvelope className="inline mr-2" />
            </button>
            <button
              onClick={() => setIsOtpLogin(true)}
              className={`tab-btn ${isOtpLogin ? 'active' : ''}`}
            >
              <MdOutlineSms className="inline mr-2" />
            </button>
          </div>

          {!isOtpLogin ? (
           
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="input-group">
                  <div className="input-icon">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="••••••••@gmail.com"
                    required
                    className="form-control"
                  />
                </div>

                <div className="input-group">
                  <div className="input-icon">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="form-control"
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="remember-forgot">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm" style={{ color: 'black' }}>
                      Remember me
                    </label>

                  </div>
                  <Link to="/forgotpassword" style={{ color: 'blue' }} className="text-sm  hover:underline">
                    Forgot password?
                  </Link>

                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
              >
                Sign In
              </button>
            </form>
          ) : (
            // OTP Login Form
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="input-group">
                  <div className="input-icon">
                    <FaMobileAlt />
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    required
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isOtpSent}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded hover:bg-blue-200 transition-colors disabled:opacity-10 disabled:cursor-not-allowed"
                  >
                    {isOtpSent ? `Resend in ${countdown}s` : 'Send OTP'}
                  </button>
                </div>

                <div className="input-group">
                  <div className="input-icon">
                    <MdOutlineSms />
                  </div>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
              >
                Login with OTP
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
             <span style={{color:'black'}}> New to MedPlusMart?</span>{' '}
              <Link to="/register" style={{ color: 'blue' }} className="text-sm hover:underline">
                New User? Register Now
              </Link>
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="footer-links">
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link"> Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
