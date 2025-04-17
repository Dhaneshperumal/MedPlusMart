import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container row">
        <div className="footer-section col-md-4 col-sm-12">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="/profile">Account</a></li>
          </ul>
        </div>
        
        <div className="footer-section col-md-4 col-sm-12">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> 1800-123-4567</p>
          <p><FaMapMarkerAlt /> 123 Health Street, Medical City</p>
        </div>
        
        <div className="footer-section ">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        &copy; {new Date().getFullYear()} MedPlusMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;