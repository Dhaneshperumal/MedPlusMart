import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaPhoneAlt, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdLocalPharmacy, MdMedicalServices, MdHealthAndSafety } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';

const HomePage = ({ isLoggedIn }) => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const offers = [
    { 
      id: 1, 
      title: '20% off on all medicines', 
      description: 'Use code HEALTH20', 
      image: 'medicine-offer.jpg' 
    },
    { 
      id: 2, 
      title: 'Buy 1 Get 1 Free', 
      description: 'On selected items', 
      image: 'medicine-offer.jpg' 
    },
    { 
      id: 3, 
      title: 'Free Delivery on orders over $50', 
      description: 'Limited time offer', 
      image: 'medicine-offer.jpg' 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  const nextOffer = () => {
    setCurrentOfferIndex((prevIndex) => 
      prevIndex === offers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevOffer = () => {
    setCurrentOfferIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">MedPlusMart</div>

        <div className="nav-links">
          {isLoggedIn ? (
            <a href="/profile"><FaUser /> Profile</a>
          ) : (
            <a href="/login"><FaUser /> Login/Register</a>
          )}
          <a href="#"><FaHeart /> Wishlist</a>
          <a href="#"><FaShoppingCart /> Cart</a>
        </div>
      </nav>

      {/* Search Bar */}
      <section className="hero-banner">
      <div className="search-bar">
          <input type="text" placeholder="Search medicines, health products..." />
          <button><FaSearch /></button>
      </div>
      </section>

      {/* Hero Section */}

      <section className="hero">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Get 20% off on all medicines with code HEALTH20</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <MdLocalPharmacy className="category-icon" />
            <span>Medicines</span>
          </div>
          <div className="category-card">
            <MdMedicalServices className="category-icon" />
            <span>Lab Tests</span>
          </div>
          <div className="category-card">
            <GiMedicines className="category-icon" />
            <span>Wellness</span>
          </div>
          <div className="category-card">
            <MdHealthAndSafety className="category-icon" />
            <span>Personal Care</span>
          </div>
        </div>
      </section>

      {/* Offers Carousel */}
      <section className="offers">
        <h2>Special Offers</h2>
        <div className="offer-carousel-container">
          <button className="carousel-button prev" onClick={prevOffer}>
            <FaChevronLeft />
          </button>
          
          <div className="offer-carousel">
            {offers.map((offer, index) => (
              <div 
                key={offer.id} 
                className={`offer-card ${index === currentOfferIndex ? 'active' : ''}`}
              >
                <img src={offer.image} alt={offer.title} />
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </div>
            ))}
          </div>
          
          <button className="carousel-button next" onClick={nextOffer}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="/profile">Account</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> 1800-123-4567</p>
          <p><FaMapMarkerAlt /> 123 Health Street, Medical City</p>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
