import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FilterSidebar.css';

const FilterSidebar = ({ 
  activeFilters, 
  setActiveFilters, 
  flavors, 
  dietaryOptions,
  clearAllFilters 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    flavors: true,
    price: true,
    dietary: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFlavorChange = (flavorName) => {
    setActiveFilters(prev => ({
      ...prev,
      flavors: prev.flavors.includes(flavorName)
        ? prev.flavors.filter(f => f !== flavorName)
        : [...prev.flavors, flavorName]
    }));
  };

  const handleDietaryChange = (dietId) => {
    setActiveFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(dietId)
        ? prev.dietary.filter(d => d !== dietId)
        : [...prev.dietary, dietId]
    }));
  };

  const handlePriceChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: Number(value)
      }
    }));
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        {(activeFilters.flavors.length > 0 || 
          activeFilters.dietary.length > 0 || 
          activeFilters.priceRange.min > 0 || 
          activeFilters.priceRange.max < 500) && (
          <button className="clear-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Flavors Section */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('flavors')}
        >
          <span>Flavors</span>
          {expandedSections.flavors ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedSections.flavors && (
          <div className="section-content">
            {flavors.map(flavor => (
              <label key={flavor.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={activeFilters.flavors.includes(flavor.name)}
                  onChange={() => handleFlavorChange(flavor.name)}
                />
                <span className="checkbox-custom" style={{ borderColor: flavor.color }}>
                  <span className="checkbox-check" style={{ background: flavor.color }}></span>
                </span>
                <span className="flavor-name">
                  <span className="flavor-dot" style={{ background: flavor.color }}></span>
                  {flavor.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('price')}
        >
          <span>Price Range</span>
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedSections.price && (
          <div className="section-content">
            <div className="price-inputs">
              <div className="price-input-wrapper">
                <span className="currency">₹</span>
                <input
                  type="number"
                  min="0"
                  max={activeFilters.priceRange.max}
                  value={activeFilters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
              </div>
              <span className="price-separator">—</span>
              <div className="price-input-wrapper">
                <span className="currency">₹</span>
                <input
                  type="number"
                  min={activeFilters.priceRange.min}
                  max="500"
                  value={activeFilters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>
            
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="500"
                value={activeFilters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="slider slider-min"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={activeFilters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="slider slider-max"
              />
              <div className="slider-track"></div>
            </div>
            
            <div className="price-presets">
              <button onClick={() => setActiveFilters(prev => ({ ...prev, priceRange: { min: 0, max: 100 } }))}>
                Under ₹100
              </button>
              <button onClick={() => setActiveFilters(prev => ({ ...prev, priceRange: { min: 100, max: 250 } }))}>
                ₹100 - ₹250
              </button>
              <button onClick={() => setActiveFilters(prev => ({ ...prev, priceRange: { min: 250, max: 500 } }))}>
                ₹250 - ₹500
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dietary Preferences Section */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('dietary')}
        >
          <span>Dietary Preferences</span>
          {expandedSections.dietary ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedSections.dietary && (
          <div className="section-content">
            {dietaryOptions.map(option => (
              <label key={option.id} className="checkbox-label dietary-label">
                <input
                  type="checkbox"
                  checked={activeFilters.dietary.includes(option.id)}
                  onChange={() => handleDietaryChange(option.id)}
                />
                <span className="checkbox-custom"></span>
                <span className="dietary-name">
                  <span className="dietary-icon">{option.icon}</span>
                  {option.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Section */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('availability')}
        >
          <span>Availability</span>
          {expandedSections.availability ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedSections.availability && (
          <div className="section-content">
            <label className="radio-label">
              <input
                type="radio"
                name="availability"
                value="all"
                checked={activeFilters.availability === 'all'}
                onChange={() => setActiveFilters(prev => ({ ...prev, availability: 'all' }))}
              />
              <span className="radio-custom"></span>
              <span>All Products</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="availability"
                value="in-stock"
                checked={activeFilters.availability === 'in-stock'}
                onChange={() => setActiveFilters(prev => ({ ...prev, availability: 'in-stock' }))}
              />
              <span className="radio-custom"></span>
              <span>In Stock Only</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;