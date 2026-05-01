import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-brand">
          <h3>WIN-DIA</h3>
          <p>Healthy traditional khakhra crafted with coconut flour for mindful snacking.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/shop">Shop</Link>
            <Link to="/our-story">Our Story</Link>
            <Link to="/health-benefits">Health Benefits</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link to="/track-order">Track Order</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>info@win-dia.com</p>
          <p>+91 98765 43210</p>
          <p>Bengaluru, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WIN-DIA. All rights reserved.</p>
      </div>
    </footer>
  );
}
