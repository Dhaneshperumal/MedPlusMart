import React from 'react';
import { MdMedicalServices } from 'react-icons/md';
import '../products/Category.css';
import Header from '../Header';
import Footer from '../Footer';

const LabTestCategory = () => {
  const tests = [
    { id: 1, name: 'Basic Health Checkup', tests: ['CBC', 'Blood Sugar', 'Lipid Profile'] },
    { id: 2, name: 'Diabetes Panel', tests: ['Fasting Glucose', 'HbA1c', 'Insulin'] },
    { id: 3, name: 'Thyroid Profile', tests: ['TSH', 'T3', 'T4'] },
    { id: 4, name: 'Liver Function', tests: ['ALT', 'AST', 'Bilirubin'] },
    { id: 5, name: 'Kidney Function', tests: ['Creatinine', 'BUN', 'Uric Acid'] },
    { id: 6, name: 'Vitamin Tests', tests: ['Vitamin D', 'Vitamin B12', 'Iron'] },
  ];

  return (
    <div className="category-container labtest-category">
    <Header/>
    <div className="category-container">
      <div className="category-header">
        <MdMedicalServices className="category-main-icon" />
        <h2>Lab Tests</h2>
      </div>
      <div className="subcategory-grid">
        {tests.map((packagess) => (
          <div key={packagess.id} className="subcategory-card">
            <h3>{packagess.name}</h3>
            <ul className="product-list">
              {packagess.tests.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
            <div className="price-container">
              <span className="original-price">₹999</span>
              <span className="discounted-price">₹699</span>
            </div>
            <button className="book-now-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LabTestCategory;
