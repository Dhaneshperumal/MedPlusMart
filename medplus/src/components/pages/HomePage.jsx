import React, { useState, useEffect } from 'react';
import { MdLocalPharmacy, MdMedicalServices, MdHealthAndSafety, MdSearch, MdStar, MdStarHalf, MdEmail } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

import './HomePage.css';
import Footer from '../Footer';
import Header from '../Header';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  
  const offers = [
    { 
      id: 1, 
      title: '20% off on all medicines', 
      description: 'Use code HEALTH20', 
      image: './11.jpg' 
    },
    { 
      id: 2, 
      title: 'Buy 1 Get 1 Free', 
      description: 'On selected items', 
      image: './222.jpg' 
    },
    { 
      id: 3, 
      title: 'Free Delivery on orders over $50', 
      description: 'Limited time offer', 
      image: './333.avif' 
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content: 'This pharmacy has been a lifesaver for my family. The delivery is always on time and the staff is incredibly helpful.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Citizen',
      content: 'As someone who needs regular medication, I appreciate the reminders and the excellent service. Highly recommended!',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'New Mom',
      content: 'The baby care products are top quality and the home delivery saves me so much time with a newborn.',
      rating: 5
    }
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

  // Add this to your component
const scrollToTestimonial = (index) => {
  const container = document.getElementById('testimonials-scroll-container');
  const cards = container.querySelectorAll('.testimonial-card');
  if (cards[index]) {
    cards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
};

// Add scroll event listener to update active dot
useEffect(() => {
  const container = document.getElementById('testimonials-scroll-container');
  const dots = document.querySelectorAll('.nav-dot');
  
  const handleScroll = () => {
    const cards = container.querySelectorAll('.testimonial-card');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      
      if (Math.abs(cardCenter - containerCenter) < cardRect.width / 2) {
        dots.forEach(dot => dot.setAttribute('data-active', 'false'));
        dots[index].setAttribute('data-active', 'true');
      }
    });
  };
  
  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, [testimonials]);

  const prevOffer = () => {
    setCurrentOfferIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with email:', email);
    // Add your signup logic here
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={`full-${i}`} className="star-icon full-star" />);
    }
    
    if (hasHalfStar) {
      stars.push(<MdStarHalf key="half" className="star-icon half-star" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MdStar key={`empty-${i}`} className="star-icon empty-star" />);
    }
    
    return stars;
  };

  return (
    <>
      <Header showSearch={false} />
      <div className="home-page">
        <main>
          {/* Search Bar Section */}
          <section className="search-section">
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search for medicines, health products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                <MdSearch className="searchicon" />
                </button>
              </form>
            </div>
          </section>

          {/* Hero Section */}
          <section className="hero-section" style={{ backgroundImage: `url(./banner.avif)` }}>
            <div className="hero-content">
              <h1>Your Health, Our Priority</h1>
              <p>Order Medicines Online Anytime</p>
              <p>Genuine Products | Fast Delivery | Great Discounts</p>
              <p>Your Trusted E-Pharmacy – MedPlusMart</p>
              <button className="cta-button">Shop Now</button>
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories-section">
            <div className="section-container">
              <h2>Shop by Category</h2>
              <div className="category-grid">
                <div className="category-card">
                  <MdLocalPharmacy className="category-icon" />
                  <Link to={'/medicine'}>Medicines</Link>
                </div>
                <div className="category-card">
                  <MdMedicalServices className="category-icon" />
                  <Link to={'labtest'}>Lab Tests</Link>
                </div>
                <div className="category-card">
                  <GiMedicines className="category-icon" />
                  <Link to={'/wellness'}>Wellness</Link>
                </div>
                <div className="category-card">
                  <MdHealthAndSafety className="category-icon" />
                  <Link to={'/personalcare'}>Personal Care</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Offers Section */}
<section className="offers-section">
  <div className="section-container">
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
            <div className="offer-image-container">
              <img src={offer.image} alt={offer.title} />
            </div>
            <h3 >{offer.title}</h3>
            <p>{offer.description}</p>
            <button className="offer-button">Claim Offer</button>
          </div>
        ))}
      </div>
      
      <button className="carousel-button next" onClick={nextOffer}>
        <FaChevronRight />
      </button>
    </div>
    
    {/* Mobile indicators */}
    <div className="offer-indicators">
      {offers.map((_, index) => (
        <div 
          key={index}
          className={`indicator ${index === currentOfferIndex ? 'active' : ''}`}
          onClick={() => setCurrentOfferIndex(index)}
        />
      ))}
    </div>
  </div>
</section>

{/* testominal section */}
          <section className="testimonials-section">
  <div className="section-container">
    <h2>What Our Customers Say</h2>
    <div className="testimonials-grid" id="testimonials-scroll-container">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="testimonial-content">{testimonial.content}</p>
          <div className="testimonial-rating">
            {renderStars(testimonial.rating)}
          </div>
          <div className="testimonial-author">
            <h4>{testimonial.name}</h4>
            <p>{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="testimonials-nav-dots">
      {testimonials.map((_, index) => (
        <div 
          key={index} 
          className="nav-dot" 
          onClick={() => scrollToTestimonial(index)}
          data-active={index === 0 ? "true" : "false"}
        />
      ))}
    </div>
  </div>
</section>

          {/* Signup Section */}
          <section className="signup-section">
            <div className="section-container">
              <h2>Sign Up for Special Offers</h2>
              <p>Get exclusive discounts and health tips delivered to your inbox</p>
              <form onSubmit={handleSignup} className="signup-form">
                <div className="email-input">
                  <MdEmail className="email-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="signup-button">
                  Sign Up
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;