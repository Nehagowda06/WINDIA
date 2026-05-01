import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiHome,
  FiChevronDown 
} from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoError, setLogoError] = useState(false);
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Health Benefits', path: '/health-benefits' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Vision', path: '/vision' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          {!logoError ? (
            <img 
              src="/images/windia-logo.png" 
              alt="WIN-DIA - The Divine Healthy Crunch" 
              className="navbar-logo"
              loading="eager"
              fetchPriority="high"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="navbar-logo-fallback">
              <span className="fallback-icon">🥥</span>
            </div>
          )}
          <div className="navbar-brand-text">
            <span className="brand-primary">WIN-DIA</span>
            <span className="brand-tagline">The Divine Healthy Crunch</span>
          </div>
        </Link>

        {/* Main Navigation */}
        <nav className={`navbar-menu ${isMobileMenuOpen ? 'navbar-menu-open' : ''}`}>
          <div className="navbar-menu-header">
            <span className="menu-title">Menu</span>
            <button 
              className="menu-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>
          
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <Link 
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  {item.name === 'Home' && <FiHome className="nav-link-icon" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Contact Info */}
          <div className="navbar-mobile-footer">
            <a href="tel:+918214527307" className="mobile-contact">
              <FiUser /> +91 821 4527307
            </a>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Search Toggle */}
          <button 
            className="navbar-action-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <FiSearch />
          </button>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="navbar-action-btn" aria-label="Wishlist">
            <FiHeart />
            {wishlistItems.length > 0 && (
              <span className="navbar-badge">{wishlistItems.length}</span>
            )}
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="navbar-action-btn navbar-cart-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="navbar-badge navbar-badge-cart">{cartItems.length}</span>
            )}
          </Link>
          
          {/* Account */}
          <Link to="/track-order" className="navbar-action-btn navbar-account-btn" aria-label="Account">
            <FiUser />
          </Link>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="navbar-search-overlay">
            <form className="navbar-search-form" onSubmit={handleSearch}>
              <FiSearch className="search-form-icon" />
              <input
                type="text"
                placeholder="Search khakhras, recipes, health benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-form-input"
              />
              <button type="submit" className="search-form-submit">
                Search
              </button>
              <button 
                type="button" 
                className="search-form-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <FiX />
              </button>
            </form>
            <div 
              className="navbar-search-backdrop"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        )}
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="navbar-mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;