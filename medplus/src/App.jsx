import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import ForgotPassword from './components/auth/ForgotPassword';
import Register from './components/auth/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check both localStorage and sessionStorage for existing login
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        const { token, timestamp } = JSON.parse(userData);
        // Check if login is still valid (e.g., within 7 days)
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return token && Date.now() - timestamp < oneWeek;
      } catch {
        return false;
      }
    }
    return false;
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
