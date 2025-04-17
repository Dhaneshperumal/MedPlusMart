import React from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaHandsHelping } from 'react-icons/fa';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">MedPlusMart</div>
        
        
        
        <nav className="nav-links">
          {isLoggedIn ? (
            <a href="/profile"><FaUser /> Profile</a>
          ) : (
            <a href="/login"><FaUser /> Login/Register</a>
          )}
         
          <a href="#"><FaShoppingCart /> Cart</a>
          <a href="#"><FaHandsHelping /> Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;