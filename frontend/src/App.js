import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Header from './components/Header/Header';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OurStory from './pages/OurStory/OurStory';
import HealthBenefits from './pages/HealthBenefits/HealthBenefits';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import Vision from './pages/Vision/Vision';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import Wishlist from './pages/Wishlist/Wishlist';
import Contact from './pages/Contact/Contact';

import './App.css';

// Wrapper component to conditionally render Footer
const AppContent = () => {
  const location = useLocation();
  
  // Show footer ONLY on home page
  const showFooter = location.pathname === '/';

  return (
    <div className="app">
      <Header />
      <Toaster position="bottom-right" />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/health-benefits" element={<HealthBenefits />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:slug" element={<RecipeDetail />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
     
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;