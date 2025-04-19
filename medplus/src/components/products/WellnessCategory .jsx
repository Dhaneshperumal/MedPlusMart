import React from 'react';
import { GiMedicines } from 'react-icons/gi';
import '../products/Category.css';
import Footer from '../Footer';
import Header from '../Header';

const WellnessCategory = () => {
  const wellnessProducts = [
    { id: 1, name: 'Ayurveda', products: ['Ashwagandha', 'Triphala', 'Chyawanprash'] },
    { id: 2, name: 'Homeopathy', products: ['Arnica', 'Nux Vomica', 'Pulsatilla'] },
    { id: 3, name: 'Nutrition', products: ['Protein Powder', 'Omega-3', 'Multivitamins'] },
    { id: 4, name: 'Fitness', products: ['Dumbbells', 'Yoga Mat', 'Resistance Bands'] },
    { id: 5, name: 'Mental Wellness', products: ['Essential Oils', 'Meditation App', 'Sleep Aid'] },
    { id: 6, name: 'Sexual Wellness', products: ['Condoms', 'Lubricants', 'Pregnancy Tests'] },
  ];

  return (
    <div className="category-container wellness-category">
    <Header/>
    <div className="category-container">
      <div className="category-header">
        <GiMedicines className="category-main-icon" />
        <h2>Wellness</h2>
      </div>
      <div className="subcategory-grid">
        {wellnessProducts.map((category) => (
          <div key={category.id} className="subcategory-card wellness-card">
            <h3>{category.name}</h3>
            <ul className="product-list">
              {category.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <div className="wellness-tips">
              <p style={{color:'black'}}>Health Tip: {getWellnessTip(category.name)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const getWellnessTip = (category) => {
  const tips = {
    Ayurveda: "Take Ashwagandha with warm milk for better absorption.",
    Homeopathy: "Store homeopathic medicines away from strong smells.",
    Nutrition: "Stay hydrated for optimal nutrient absorption.",
    Fitness: "Stretch before and after workouts to prevent injuries.",
    'Mental Wellness': "Practice deep breathing for 5 minutes daily.",
    'Sexual Wellness': "Regular checkups are important for sexual health."
  };
  return tips[category] || "Maintain a balanced lifestyle for overall wellness.";
};

export default WellnessCategory;
