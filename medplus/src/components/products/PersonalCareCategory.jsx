import React from 'react';
import { MdHealthAndSafety } from 'react-icons/md';
import '../products/Category.css';

const PersonalCareCategory = () => {
  const categories = [
    { id: 1, name: 'Skin Care', products: ['Moisturizers', 'Sunscreen', 'Face Wash'] },
    { id: 2, name: 'Hair Care', products: ['Shampoo', 'Conditioner', 'Hair Oil'] },
    { id: 3, name: 'Oral Care', products: ['Toothpaste', 'Mouthwash', 'Toothbrush'] },
    { id: 4, name: 'Feminine Hygiene', products: ['Sanitary Pads', 'Intimate Wash', 'Menstrual Cup'] },
    { id: 5, name: 'Baby Care', products: ['Diapers', 'Baby Wipes', 'Baby Powder'] },
    { id: 6, name: 'Senior Care', products: ['Adult Diapers', 'Walkers', 'Pain Relief Cream'] },
  ];

  return (
    <div className="category-container personalcare-category">
      <div className="category-header">
        <MdHealthAndSafety className="category-main-icon" />
        <h2>Personal Care</h2>
      </div>
      <div className="subcategory-grid">
        {categories.map((category) => (
          <div key={category.id} className="subcategory-card">
            <h3>{category.name}</h3>
            <ul className="product-list">
              {category.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <div className="brands">
              <span style={{color:'black'}}>Popular Brands:</span>
              <div className="brand-tags">
                <span style={{color:'black'}}>Dove</span>
                <span style={{color:'black'}}>Himalaya</span>
                <span style={{color:'black'}}>Pampers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalCareCategory;
