import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check both localStorage and sessionStorage for existing login
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        const { timestamp } = JSON.parse(userData);
        // Check if login is still valid (e.g., within 7 days)
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return Date.now() - timestamp < oneWeek;
      } catch {
        return false;
      }
    }
    return false;
  });

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage isLoggedIn={isLoggedIn} />} 
        />
        <Route 
          path="/login" 
          element={<Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />
        <Route 
          path="/profile" 
          element={<ProfilePage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
