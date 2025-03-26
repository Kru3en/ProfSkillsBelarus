import {  Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import CatalogPage from '@/pages/CatalogPage';
import PromotionsPage from '@/pages/PromotionsPage';
import AccountPage from '@/pages/AccountPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CartPage from '@/pages/CartPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
  );
}

export default App;
