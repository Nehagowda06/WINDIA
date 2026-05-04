'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiHome,
} from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cartItems = useSelector((state) => state.cart?.cartItems) || [];
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems) || [];

  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Health Benefits', path: '/health-benefits' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    const currentPath = location || '';
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  // ✅ Fix: return null on server — prevents any server/client HTML mismatch
  if (!isMounted) return null;

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      suppressHydrationWarning
    >
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
        <Link href="/" className="navbar-brand">
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
                  href={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  {item.name === 'Home' && <FiHome className="nav-link-icon" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ✅ Fix: changed <a> to <Link> to avoid bare anchor tags */}
          <div className="navbar-mobile-footer">
            <Link href="tel:+918214527307" className="mobile-contact">
              <FiUser /> +91 821 4527307
            </Link>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button
            className="navbar-action-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          <Link href="/wishlist" className="navbar-action-btn" aria-label="Wishlist">
            <FiHeart />
            {wishlistItems.length > 0 && (
              <span className="navbar-badge">{wishlistItems.length}</span>
            )}
          </Link>

          <Link href="/cart" className="navbar-action-btn navbar-cart-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="navbar-badge navbar-badge-cart">{cartItems.length}</span>
            )}
          </Link>

          <Link href="/track-order" className="navbar-action-btn navbar-account-btn" aria-label="Account">
            <FiUser />
          </Link>
        </div>

        {/* ✅ Fix: replaced <form> with <div> + onSubmit moved to button onClick */}
        {isSearchOpen && (
          <div className="navbar-search-overlay">
            <div className="navbar-search-form">
              <FiSearch className="search-form-icon" />
              <input
                type="text"
                placeholder="Search khakhras, recipes, health benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-form-input"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              <button
                type="button"
                className="search-form-submit"
                onClick={handleSearch}
              >
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
            </div>
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