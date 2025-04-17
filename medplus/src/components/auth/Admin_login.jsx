import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import "./Login.css"
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      {/* <Header/> */}
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <h1 className="text-xl font-bold">Admin Login</h1>
            <p className="text-blue-100">Please log in to continue</p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="input-group">
                  <div className="input-icon">
                    <FaEnvelope/>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
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
                  <Link to="/adminforgot" style={{ color: 'blue' }} className="text-sm hover:underline">
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
          </div>

          <div className="card-footer">
            <div className="footer-links">
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link"> Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default AdminLogin;
