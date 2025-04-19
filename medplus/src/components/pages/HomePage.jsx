import React, { useState, useEffect } from 'react';
import { MdLocalPharmacy, MdMedicalServices, MdHealthAndSafety, MdSearch, MdStar, MdStarHalf, MdEmail } from 'react-icons/md';
import { GiMedicines, GiHealthNormal } from 'react-icons/gi';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaRunning, FaHeartbeat } from 'react-icons/fa';
import { IoMdNutrition } from 'react-icons/io';
import { BsShieldPlus } from 'react-icons/bs';

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
      image: './11.jpg',
      bgColor: '#e3f2fd'
    },
    { 
      id: 2, 
      title: 'Buy 1 Get 1 Free', 
      description: 'On selected items', 
      image: './222.jpg',
      bgColor: '#fff8e1'
    },
    { 
      id: 3, 
      title: 'Free Delivery on orders over $50', 
      description: 'Limited time offer', 
      image: './333.avif',
      bgColor: '#e8f5e9'
    },
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain optimal health.',
      icon: <GiHealthNormal className="health-tip-icon" />,
      color: '#4fc3f7'
    },
    {
      id: 2,
      title: 'Regular Exercise',
      description: '30 minutes of daily exercise boosts immunity and mental health.',
      icon: <FaRunning className="health-tip-icon" />,
      color: '#66bb6a'
    },
    {
      id: 3,
      title: 'Balanced Diet',
      description: 'Include fruits, vegetables and proteins in your daily meals.',
      icon: <IoMdNutrition className="health-tip-icon" />,
      color: '#ffa726'
    },
    {
      id: 4,
      title: 'Preventive Care',
      description: 'Regular health checkups can detect problems early.',
      icon: <BsShieldPlus className="health-tip-icon" />,
      color: '#ba68c8'
    }
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

  const featuredProducts = [
    {
      id: 1,
      name: 'Vitamin D3 Supplements',
      category: 'Wellness',
      price: '$12.99',
      image: './banner3.avif'
    },
    {
      id: 2,
      name: 'Blood Pressure Monitor',
      category: 'Health Devices',
      price: '$39.99',
      image: './11.jpg'
    },
    {
      id: 3,
      name: 'Organic Face Cream',
      category: 'Personal Care',
      price: '$18.50',
      image: './222.jpg'
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
          <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), url(./banner.avif)` }}>
            <div className="hero-content">
              <h1>Your Health, Our Priority</h1>
              <p>Order Medicines Online Anytime</p>
              <p className="hero-highlight">Genuine Products | Fast Delivery | Great Discounts</p>
              <p>Your Trusted E-Pharmacy – MedPlusMart</p>
              <div className="hero-buttons">
                <button className="cta-button primary">Shop Now</button>
                <button className="cta-button secondary">Learn More</button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-container">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Products Available</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>Authentic Medicines</p>
              </div>
              <div className="stat-item">
                <h3>1M+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories-section">
            <div className="section-container">
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Browse our wide range of health and wellness products</p>
              <div className="category-grid">
                <div className="category-card">
                  <MdLocalPharmacy className="category-icon" />
                  <Link to={'/medicine'}>Medicines</Link>
                  <p>Prescription and OTC drugs</p>
                </div>
                <div className="category-card">
                  <MdMedicalServices className="category-icon" />
                  <Link to={'labtest'}>Lab Tests</Link>
                  <p>At-home and diagnostic tests</p>
                </div>
                <div className="category-card">
                  <GiMedicines className="category-icon" />
                  <Link to={'/wellness'}>Wellness</Link>
                  <p>Vitamins and supplements</p>
                </div>
                <div className="category-card">
                  <MdHealthAndSafety className="category-icon" />
                  <Link to={'/personalcare'}>Personal Care</Link>
                  <p>Beauty and hygiene products</p>
                </div>
              </div>
            </div>
          </section>

          {/* Offers Section */}
          <section className="offers-section">
            <div className="section-container">
              <h2 className="section-title">Special Offers</h2>
              <p className="section-subtitle">Don't miss these limited time deals</p>
              <div className="offer-carousel-container">
                <button className="carousel-button prev" onClick={prevOffer}>
                  <FaChevronLeft />
                </button>
                
                <div className="offer-carousel">
                  {offers.map((offer, index) => (
                   <div className={`offer-card ${index === currentOfferIndex ? 'active' : ''}`}
                   style={{ backgroundColor: offer.bgColor }}>
                   <div className="offer-image-container">
                     <img src={offer.image} alt={offer.title} />
                   </div>
                   <div className="offer-content">
                     <h3 style={{ color: '#1a237e' }}>{offer.title}</h3>
                     <p>{offer.description}</p>
                     <button className="offer-button">Claim Offer</button>
                   </div>
                 </div>
                  ))}
                </div>
                
                <button className="carousel-button next" onClick={nextOffer}>
                  <FaChevronRight />
                </button>
              </div>
              
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

          {/* Featured Products */}
          <section className="featured-products">
            <div className="section-container">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Our customers' favorites</p>
              <div className="products-grid">
                {featuredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">{product.price}</p>
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Health Tips Section */}
          <section className="health-tips-section">
            <div className="section-container">
              <h2 className="section-title">Health Tips</h2>
              <p className="section-subtitle">Expert advice for better living</p>
              <div className="health-tips-grid">
                {healthTips.map(tip => (
                  <div 
                    key={tip.id} 
                    className="health-tip-card"
                    style={{ borderTop: `4px solid ${tip.color}` }}
                  >
                    {tip.icon}
                    <h3>{tip.title}</h3>
                    <p>{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <div className="section-container">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">Hear from people who trust us</p>
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
              <h2 className="section-title">Stay Connected</h2>
              <p className="section-subtitle">Sign up for our newsletter to receive health tips and exclusive offers</p>
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
                  Subscribe
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