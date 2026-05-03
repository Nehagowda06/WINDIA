'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight,
  FiArrowLeft, FiTag, FiTruck, FiShield, FiPercent,
  FiShare2, FiClock, FiHeart, FiAlertTriangle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromCart, updateQuantity, setCart, addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist } from '../../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';
import './Cart.css';

const FREE_SHIPPING_THRESHOLD = 499;

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingPincode, setShippingPincode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // ── Load from localStorage + set mounted
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    dispatch(setCart(storedCart));
    setIsMounted(true);
  }, [dispatch]);

  // ── Save to localStorage on cart change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  // ── Detect shared cart from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get('shared');
      if (shared) {
        try {
          const decoded = JSON.parse(atob(shared));
          toast.success(`Loaded a shared cart with ${decoded.length} item(s)!`);
        } catch {
          toast.error('Invalid shared cart link');
        }
      }
    }
  }, []);

  // ── FEATURE 9: Fetch recommendations for empty cart
  useEffect(() => {
    if (isMounted && cartItems.length === 0) {
      setLoadingRecs(true);
      fetch('/api/products?sort=bestseller&limit=4')
        .then((res) => res.json())
        .then((data) => {
          // support both { products: [] } and plain []
          setRecommendations(data.products || data || []);
        })
        .catch(() => setRecommendations([]))
        .finally(() => setLoadingRecs(false));
    }
  }, [isMounted, cartItems.length]);

  // ── Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalFiber = cartItems.reduce((acc, item) => {
    const fiber = item.nutritionalInfo?.dietaryFiber || 4.85;
    return acc + (fiber * item.qty * (item.netWeight || 80) / 100);
  }, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax + shippingCost;

  // ── FEATURE 1: Free Shipping Progress
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  // ── FEATURE 5: Debounced Quantity Change
  const debounceTimers = {};
  const handleQuantityChange = useCallback((id, delta, currentQty, stock) => {
    if (debounceTimers[id]) clearTimeout(debounceTimers[id]);
    debounceTimers[id] = setTimeout(() => {
      const newQty = currentQty + delta;
      if (newQty < 1) return;
      if (newQty > stock) {
        toast.error(`Only ${stock} items available in stock`);
        return;
      }
      dispatch(updateQuantity({ id, qty: newQty }));
    }, 300);
  }, [dispatch]);

  // ── FEATURE 3: Save for Later
  const handleSaveForLater = (item) => {
    const alreadyInWishlist = wishlistItems.find(i => i._id === item._id);
    dispatch(removeFromCart(item._id));
    if (!alreadyInWishlist) {
      dispatch(addToWishlist(item));
      toast.success(`${item.name} saved to wishlist!`);
    } else {
      toast(`${item.name} removed from cart (already in wishlist)`);
    }
  };

  // ── FEATURE 1: Undo Remove
  const handleRemoveItem = (id, name) => {
    const removedItem = cartItems.find((item) => item._id === id);
    dispatch(removeFromCart(id));
    toast(
      (t) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🗑️ <strong>{name}</strong> removed</span>
          <button
            onClick={() => {
              dispatch(addToCart(removedItem));
              toast.dismiss(t.id);
              toast.success(`${name} added back!`);
            }}
            style={{
              background: '#4CAF50', color: '#fff', border: 'none',
              borderRadius: '4px', padding: '4px 10px',
              cursor: 'pointer', fontWeight: 'bold',
            }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 5000 }
    );
  };

  // ── FEATURE 2: Delivery Date Estimate
  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long', month: 'short', day: 'numeric',
    });
  };

  // ── FEATURE: Share Cart
  const handleShareCart = async () => {
    const cartData = cartItems.map((item) => ({ id: item._id, qty: item.qty }));
    const encoded = btoa(JSON.stringify(cartData));
    const shareUrl = `${window.location.origin}/cart?shared=${encoded}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my cart!',
          text: `I found some amazing khakhra thins! Total: ₹${total.toFixed(2)}`,
          url: shareUrl,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Cart link copied to clipboard! 🔗');
    }
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
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        setShippingCost(0);
        toast.success('Free shipping applied!');
      } else {
        setShippingCost(50);
        toast.success('Shipping: ₹50 (Free on orders above ₹499)');
      }
    }
  };

  // ── FEATURE 7: Cart Validation Before Checkout
  const handleCheckout = () => {
    const outOfStock = cartItems.filter(item => item.qty > item.countInStock);
    if (outOfStock.length > 0) {
      toast.error(`"${outOfStock[0].name}" only has ${outOfStock[0].countInStock} in stock. Please update your cart.`);
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  // ── Skeleton Loader
  if (!isMounted) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-skeleton">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-banner" />
            <div className="skeleton skeleton-item" />
            <div className="skeleton skeleton-item" />
            <div className="skeleton skeleton-item" />
          </div>
        </div>
      </div>
    );
  }

  // ── FEATURE 9: Empty Cart with Recommendations
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <motion.div
            className="cart-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon"><FiShoppingCart /></div>
            <h2>Your Cart is Empty</h2>
            <p>Add some delicious khakhra thins to get started!</p>
            <Link href="/shop" className="btn btn-primary">
              Explore Thins <FiArrowRight />
            </Link>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            className="recommendations"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="recommendations-title">✨ You Might Like</h3>
            {loadingRecs ? (
              <div className="recommendations-grid">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton rec-skeleton" />
                ))}
              </div>
            ) : (
              <div className="recommendations-grid">
                {recommendations.map((product) => (
                  <motion.div
                    key={product._id}
                    className="rec-card"
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/product/${product._id}`}>
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div className="rec-info">
                        <p className="rec-name">{product.name}</p>
                        <p className="rec-price">₹{product.price}</p>
                      </div>
                    </Link>
                    <button
                      className="rec-add-btn"
                      onClick={() => {
                        dispatch(addToCart({ ...product, qty: 1 }));
                        toast.success(`${product.name} added to cart!`);
                      }}
                    >
                      Add to Cart
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
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
          <div className="cart-header-left">
            <h1>Shopping Cart</h1>
            <span className="item-count">{cartItems.length} items</span>
          </div>
          <button className="btn-share-cart" onClick={handleShareCart}>
            <FiShare2 /> <span>Share Cart</span>
          </button>
        </motion.div>

        {/* FEATURE 1: Free Shipping Progress Bar */}
        <motion.div
          className="shipping-progress-wrapper"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {remainingForFreeShipping > 0 ? (
            <>
              <p className="shipping-progress-text">
                🚚 Add <strong>₹{remainingForFreeShipping.toFixed(0)}</strong> more for <strong>FREE shipping!</strong>
              </p>
              <div className="shipping-progress-bar">
                <motion.div
                  className="shipping-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </>
          ) : (
            <p className="shipping-progress-achieved">
              🎉 You've unlocked <strong>FREE shipping!</strong>
            </p>
          )}
        </motion.div>

        {/* Delivery Estimate Banner */}
        <motion.div
          className="delivery-estimate-banner"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FiClock />
          <span>Order now — estimated delivery by <strong>{getEstimatedDelivery()}</strong></span>
        </motion.div>

        <div className="cart-layout">

          {/* Cart Items */}
          <motion.div
            className="cart-items"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
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
                  <Link href={`/product/${item._id}`} className="item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </Link>

                  <div className="item-details">
                    <Link href={`/product/${item._id}`} className="item-name">
                      {item.name}
                    </Link>
                    <p className="item-description">{item.shortDescription}</p>

                    <div className="item-badges">
                      {item.isLowGI && <span className="badge low-gi">Low GI</span>}
                      {item.isGlutenFree && <span className="badge gluten-free">Gluten Free</span>}
                      {/* FEATURE 2: Stock Warning Badge */}
                      {item.countInStock <= 3 && (
                        <span className="badge stock-warning">
                          <FiAlertTriangle /> Only {item.countInStock} left!
                        </span>
                      )}
                    </div>

                    <div className="item-price">
                      <span className="current-price">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">₹{item.originalPrice}</span>
                      )}
                    </div>

                    {/* FEATURE 3: Save for Later */}
                    <button
                      className="save-for-later-btn"
                      onClick={() => handleSaveForLater(item)}
                    >
                      <FiHeart /> Save for Later
                    </button>
                  </div>

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

                  <div className="item-total">
                    <span className="total-label">Total</span>
                    <span className="total-value">₹{item.price * item.qty}</span>
                  </div>

                  <button
                    className="item-remove"
                    onClick={() => handleRemoveItem(item._id, item.name)}
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/shop" className="continue-shopping-link">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

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

              {promoApplied && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

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

              <div className="summary-row">
                <span>Estimated Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button className="btn-checkout" onClick={handleCheckout}>
                Proceed to Checkout <FiArrowRight />
              </button>

              <div className="trust-badges">
                <div className="trust-item"><FiShield /> Secure Checkout</div>
                <div className="trust-item"><FiTruck /> Free Shipping over ₹499</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FEATURE 10: Mobile Sticky Checkout Bar */}
      <div className="mobile-checkout-bar">
        <div className="mobile-checkout-total">
          <span className="mobile-total-label">Total</span>
          <span className="mobile-total-value">₹{total.toFixed(2)}</span>
        </div>
        <button className="mobile-checkout-btn" onClick={handleCheckout}>
          Checkout <FiArrowRight />
        </button>
      </div>

    </div>
  );
};

export default Cart;