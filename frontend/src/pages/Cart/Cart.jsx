import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiArrowRight,
  FiArrowLeft,
  FiTag,
  FiTruck,
  FiShield,
  FiPercent
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingPincode, setShippingPincode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalFiber = cartItems.reduce((acc, item) => {
    const fiber = item.nutritionalInfo?.dietaryFiber || 4.85;
    return acc + (fiber * item.qty * (item.netWeight || 80) / 100);
  }, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax + shippingCost;

  const handleQuantityChange = (id, qty, currentQty, stock) => {
    const newQty = currentQty + qty;
    if (newQty < 1) return;
    if (newQty > stock) {
      toast.error(`Only ${stock} items available in stock`);
      return;
    }
    dispatch(updateQuantity({ id, qty: newQty }));
  };

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart`);
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WINDIA10') {
      setPromoApplied(true);
      toast.success('Promo code applied! 10% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handleCheckShipping = () => {
    if (shippingPincode.length === 6) {
      if (subtotal >= 499) {
        setShippingCost(0);
        toast.success('Free shipping applied!');
      } else {
        setShippingCost(50);
        toast.success(`Shipping: ₹50 (Free on orders above ₹499)`);
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <motion.div 
            className="cart-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">
              <FiShoppingCart />
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Add some delicious khakhra thins to get started!</p>
            <Link to="/shop" className="btn btn-primary">
              Explore Thins <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <motion.div 
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Shopping Cart</h1>
          <span className="item-count">{cartItems.length} items</span>
        </motion.div>

        <div className="cart-layout">
          {/* Cart Items Section */}
          <motion.div 
            className="cart-items"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Fiber Tracker Banner */}
            <div className="fiber-tracker-banner">
              <div className="fiber-icon"></div>
              <div className="fiber-content">
                <span className="fiber-label">Total Fiber in Cart</span>
                <span className="fiber-value">{totalFiber.toFixed(1)}g</span>
                <span className="fiber-desc">Supports your daily fiber goal!</span>
              </div>
            </div>

            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Item Image */}
                  <Link to={`/product/${item._id}`} className="item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>

                  {/* Item Details */}
                  <div className="item-details">
                    <Link to={`/product/${item._id}`} className="item-name">
                      {item.name}
                    </Link>
                    <p className="item-description">{item.shortDescription}</p>
                    
                    {/* Badges */}
                    <div className="item-badges">
                      {item.isLowGI && <span className="badge low-gi">Low GI</span>}
                      {item.isGlutenFree && <span className="badge gluten-free">Gluten Free</span>}
                    </div>

                    {/* Price */}
                    <div className="item-price">
                      <span className="current-price">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">₹{item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item._id, -1, item.qty, item.countInStock)}
                    >
                      <FiMinus />
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item._id, 1, item.qty, item.countInStock)}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="item-total">
                    <span className="total-label">Total</span>
                    <span className="total-value">₹{item.price * item.qty}</span>
                  </div>

                  {/* Remove Button */}
                  <button 
                    className="item-remove"
                    onClick={() => handleRemoveItem(item._id, item.name)}
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link to="/shop" className="continue-shopping-link">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </motion.div>

          {/* Order Summary Section */}
          <motion.div 
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="summary-card">
              <h3>Order Summary</h3>

              {/* Subtotal */}
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-input-wrapper">
                  <FiTag className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  {!promoApplied ? (
                    <button onClick={handleApplyPromo}>Apply</button>
                  ) : (
                    <button className="applied" disabled>✓ Applied</button>
                  )}
                </div>
                {promoApplied && (
                  <div className="promo-applied-message">
                    <FiPercent /> WINDIA10 - 10% off applied
                  </div>
                )}
              </div>

              {/* Discount */}
              {promoApplied && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              {/* Shipping */}
              <div className="shipping-section">
                <div className="shipping-input-wrapper">
                  <FiTruck className="shipping-icon" />
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={shippingPincode}
                    onChange={(e) => setShippingPincode(e.target.value)}
                    maxLength={6}
                  />
                  <button onClick={handleCheckShipping}>Check</button>
                </div>
                {shippingCost > 0 && (
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>₹{shippingCost}</span>
                  </div>
                )}
                {shippingCost === 0 && shippingPincode && (
                  <div className="free-shipping-message">
                    <FiShield /> Free Shipping Applied!
                  </div>
                )}
              </div>

              {/* Tax */}
              <div className="summary-row">
                <span>Estimated Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button className="btn-checkout" onClick={handleCheckout}>
                Proceed to Checkout <FiArrowRight />
              </button>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-item">
                  <FiShield /> Secure Checkout
                </div>
                <div className="trust-item">
                  <FiTruck /> Free Shipping over ₹499
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;