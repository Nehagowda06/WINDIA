'use client';

import React, { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../config/contact';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after scrolling 100px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    // Show by default after 2 seconds even without scrolling
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div className="whatsapp-wrapper">
      {/* Tooltip */}
      {showTooltip && (
        <div className="whatsapp-tooltip">
          Chat with us on WhatsApp!
        </div>
      )}

      {/* Floating Button */}
      <button
        className="whatsapp-btn"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.493 2.027 7.807L0 32l8.418-2.01A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.79-1.865l-.486-.29-5.002 1.195 1.234-4.863-.317-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.762c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.63-.199-.896.199-.265.398-1.03 1.294-1.262 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.057-1.982-2.362-2.214-2.76-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.233.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.763-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.199.265 2.808 4.287 6.804 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.686-1.891.333-.928.333-1.724.233-1.891-.1-.166-.365-.265-.763-.464z" />
        </svg>

        {/* Pulse animation ring */}
        <span className="whatsapp-pulse" />
      </button>
    </div>
  );
};

export default WhatsAppButton;