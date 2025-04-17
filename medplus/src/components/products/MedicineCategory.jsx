import React from 'react';
import { GiMedicinePills } from 'react-icons/gi';
import '../products/Category.css';

const MedicineCategory = () => {
  const medicines = [
    { id: 1, name: 'Pain Relief', products: ['Paracetamol', 'Ibuprofen', 'Aspirin'] },
    { id: 2, name: 'Antibiotics', products: ['Amoxicillin', 'Azithromycin', 'Ciprofloxacin'] },
    { id: 3, name: 'Diabetes Care', products: ['Metformin', 'Insulin', 'Glimepiride'] },
    { id: 4, name: 'Cardiac', products: ['Atorvastatin', 'Losartan', 'Amlodipine'] },
    { id: 5, name: 'Vitamins', products: ['Vitamin D3', 'Multivitamin', 'Vitamin B Complex'] },
    { id: 6, name: 'Digestive Care', products: ['Omeprazole', 'Ranitidine', 'Lactulose'] },
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <GiMedicinePills className="category-main-icon" />
        <h2>Medicines</h2>
      </div>
      <div className="subcategory-grid">
        {medicines.map((subcategory) => (
          <div key={subcategory.id} className="subcategory-card">
            <h3>{subcategory.name}</h3>
            <ul className="product-list">
              {subcategory.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <button className="view-all-btn">View All</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineCategory;