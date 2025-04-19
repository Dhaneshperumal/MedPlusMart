import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import ForgotPassword from './components/auth/ForgotPassword';
import Register from './components/auth/Register';
import AdminDashboard from './components/pages/AdminDashboard';
import ResetPassword from './components/auth/ResetPassword';
import MedicineCategory from './components/products/MedicineCategory';
import LabTestCategory from './components/products/LabTestCategory';
import PersonalCareCategory from './components/products/PersonalCareCategory';
import WellnessCategory from './components/products/WellnessCategory ';
import PharmacistDashboard from './components/pages/PharmacistDashboard';

import AdminLogin from './components/auth/Admin_login';
import Pharmacist_login from './components/auth/Pharmacist_login';
import AdminForgot from './components/auth/AdminForgot';
import PharmacistForgot from './components/auth/PharmacistForgot';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        const { token, timestamp } = JSON.parse(userData);
     
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return token && Date.now() - timestamp < oneWeek;
      } catch {
        return false;
      }
    }
    return false;
  });

  return (
    <>
    
    
    <Router>
      
      <Routes>
        
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/medicine" element={<MedicineCategory />} />
        <Route path="/labtest" element={<LabTestCategory />} />
        <Route path="/personalcare" element={<PersonalCareCategory />} />
        <Route path="/wellness" element={<WellnessCategory />} />
        <Route path="/Pharmacist" element={<PharmacistDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/pharmacistlogin" element={<Pharmacist_login />} />
        <Route path="/adminforgot" element={<AdminForgot />} />
        <Route path="/pharmacistforgot" element={<PharmacistForgot />} />
      
      </Routes>
    </Router>
   
    </>
  );
}

export default App;
