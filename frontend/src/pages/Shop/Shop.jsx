import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FiFilter, 
  FiX, 
  FiGrid, 
  FiList, 
  FiSearch, 
  FiArrowRight, 
  FiCheck,
  FiAward,
  FiShield,
  FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { fetchProducts } from '../../redux/actions/productActions';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    flavor: [],
    priceRange: { min: 0, max: 500 },
    dietary: [],
    sortBy: 'featured',
  });

  const flavors = [
    { name: 'Methi', color: '#8B6914' },
    { name: 'Jeera', color: '#C4451E' },
    { name: 'Garlic', color: '#E86A4A' },
    { name: 'Moringa', color: '#2D6A4F' }
  ];
  
  const dietaryOptions = ['Gluten-Free', 'Vegan', 'Low GI'];

  const trustBadges = [
    { icon: FiAward, text: 'FSSAI Certified' },
    { icon: FiShield, text: 'NABL Lab Tested' },
    { icon: FiZap, text: 'Startup Karnataka' }
  ];

  const healthStats = [
    { value: '44', label: 'Glycemic Index', badge: 'LOW' },
    { value: '4.85g', label: 'Dietary Fiber', badge: 'HIGH' },
    { value: '22g', label: 'Protein', badge: 'PREMIUM' },
    { value: '0g', label: 'Added Sugar', badge: 'ZERO' }
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.flavor.length > 0) {
      filtered = filtered.filter((product) =>
        filters.flavor.some((flavor) => product.name?.includes(flavor))
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((product) =>
        filters.dietary.every((pref) => {
          if (pref === 'Gluten-Free') return product.isGlutenFree;
          if (pref === 'Vegan') return product.isVegan;
          if (pref === 'Low GI') return product.isLowGI;
          return true;
        })
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, searchQuery]);

  const handleFlavorChange = (flavor) => {
    setFilters((prev) => ({
      ...prev,
      flavor: prev.flavor.includes(flavor)
        ? prev.flavor.filter((f) => f !== flavor)
        : [...prev.flavor, flavor],
    }));
  };

  const handleDietaryChange = (option) => {
    setFilters((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter((d) => d !== option)
        : [...prev.dietary, option],
    }));
  };

  const clearFilters = () => {
    setFilters({
      flavor: [],
      priceRange: { min: 0, max: 500 },
      dietary: [],
      sortBy: 'featured',
    });
    setSearchQuery('');
  };

  const handleFlavorPillClick = (flavorName) => {
    setFilters((prev) => ({
      ...prev,
      flavor: prev.flavor.includes(flavorName)
        ? prev.flavor.filter((f) => f !== flavorName)
        : [...prev.flavor, flavorName],
    }));
  };

  const getActiveFilterCount = () => {
    let count = filters.flavor.length + filters.dietary.length;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 500) count++;
    return count;
  };

  return (
    <div className="shop-page">
      {/* Premium Hero Section with Background Image */}
      <section className="shop-hero">
        <div className="shop-hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="shop-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badges */}
            <div className="hero-trust-badges">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div 
                    key={index}
                    className="trust-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IconComponent className="badge-icon" />
                    <span>{badge.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Headline */}
            <motion.h1 
              className="hero-headline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Coconut Khakhra <span className="hero-headline-highlight">Thins</span>
            </motion.h1>

            {/* Flavor Subheading */}
            <motion.div 
              className="hero-flavors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {flavors.map((flavor, index) => (
                <span key={flavor.name}>
                  {flavor.name}
                  {index < flavors.length - 1 && <span className="flavor-separator">•</span>}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p 
              className="hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The Divine Healthy Crunch
            </motion.p>

            {/* Description */}
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Traditionally roasted, fiber-rich khakhra thins made with 
              coconut flour and ancient Indian spices.
            </motion.p>

            {/* Health Stats Cards */}
            <motion.div 
              className="hero-stats-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {healthStats.map((stat, index) => (
                <div key={index} className="hero-stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-badge">{stat.badge}</span>
                </div>
              ))}
            </motion.div>

            {/* Quick Flavor Filter Pills */}
            <motion.div 
              className="hero-flavor-filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="filter-label">Quick Filter:</span>
              <div className="flavor-pills">
                {flavors.map((flavor) => (
                  <button
                    key={flavor.name}
                    className={`flavor-pill ${filters.flavor.includes(flavor.name) ? 'active' : ''}`}
                    onClick={() => handleFlavorPillClick(flavor.name)}
                    style={{ '--flavor-color': flavor.color }}
                  >
                    <span className="pill-name">{flavor.name}</span>
                    {filters.flavor.includes(flavor.name) && (
                      <FiCheck className="pill-check" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              className="hero-search-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="hero-search">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Methi Thins, Jeera Thins, Garlic Thins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <FiX />
                  </button>
                )}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="hero-cta-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <button 
                className="hero-cta-btn"
                onClick={() => document.querySelector('.shop-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Thins <FiArrowRight />
              </button>
            </motion.div>

            {/* Brand Promise */}
            <motion.p 
              className="hero-brand-promise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              "WIN-DIA for dine keeps the gut in line" — Rich in nutrients, truly divine.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Shop Content Section */}
      <div className="container">
        <div className="shop-content">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${showFilters ? 'active' : ''}`}>
            <div className="filter-header">
              <h3>Filters</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <FiX />
              </button>
            </div>

            <div className="filter-section">
              <h4>Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="filter-section">
              <h4>Flavors</h4>
              <div className="filter-options">
                {flavors.map((flavor) => (
                  <label key={flavor.name} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.flavor.includes(flavor.name)}
                      onChange={() => handleFlavorChange(flavor.name)}
                    />
                    <span className="checkbox-custom"></span>
                    <span>{flavor.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: Number(e.target.value) },
                    }))
                  }
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: Number(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>

            <div className="filter-section">
              <h4>Dietary Preferences</h4>
              <div className="filter-options">
                {dietaryOptions.map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                    />
                    <span className="checkbox-custom"></span>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </aside>

          {/* Products Main */}
          <div className="products-main">
            <div className="products-toolbar">
              <button className="filter-toggle" onClick={() => setShowFilters(true)}>
                <FiFilter /> Filter
                {getActiveFilterCount() > 0 && (
                  <span className="filter-count">{getActiveFilterCount()}</span>
                )}
              </button>

              <div className="results-count">{filteredProducts.length} Products Found</div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className={`products-container ${viewMode}`}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))
                ) : (
                  <div className="no-products">
                    <h3>No Thins Found</h3>
                    <p>Try adjusting your filters or search</p>
                    <button className="btn btn-primary" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;