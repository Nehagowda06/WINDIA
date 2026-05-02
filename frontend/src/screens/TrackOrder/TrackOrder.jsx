'use client';

import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  FiUser, 
  FiPackage, 
  FiMapPin, 
  FiHeart, 
  FiSettings,
  FiLogOut,
  FiEdit3,
  FiPlus,
  FiCheck,
  FiClock,
  FiTruck,
  FiHome,
  FiGrid,
  FiAward,
  FiActivity,
  FiShoppingBag,
  FiStar,
  FiGift,
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './TrackOrder.css';

const TrackOrder = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedOrders, setExpandedOrders] = useState({});
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // Mock user data
  const userData = {
    name: 'Aishwarya',
    email: 'aish36@gmail.com',
    phone: '+91 96861 53413',
    memberSince: 'January 2026',
    points: 2450,
    tier: 'gold'
  };

  // Mock orders data
  const orders = [
    {
      id: 'WND-2024-001',
      date: 'April 12, 2024',
      total: 645,
      status: 'delivered',
      items: [
        { name: 'Methi Thins', qty: 2, price: 215, fiber: 4.5, protein: 6.2, sugar: 2.1 },
        { name: 'Garlic Thins', qty: 1, price: 215, fiber: 3.8, protein: 5.5, sugar: 1.8 }
      ],
      tracking: 'DELIVERED'
    },
    {
      id: 'WND-2024-002',
      date: 'April 15, 2024',
      total: 430,
      status: 'shipped',
      items: [
        { name: 'Jeera Thins', qty: 2, price: 215, fiber: 4.2, protein: 6.0, sugar: 2.0 }
      ],
      tracking: 'IN TRANSIT'
    },
    {
      id: 'WND-2024-003',
      date: 'April 16, 2024',
      total: 215,
      status: 'processing',
      items: [
        { name: 'Moringa Thins', qty: 1, price: 215, fiber: 5.1, protein: 7.2, sugar: 1.5 }
      ],
      tracking: 'PROCESSING'
    },
    {
      id: 'WND-2024-004',
      date: 'April 10, 2024',
      total: 398,
      status: 'delivered',
      items: [
        { name: 'Curry Leaf Bites', qty: 2, price: 199, fiber: 3.9, protein: 5.8, sugar: 1.9 }
      ],
      tracking: 'DELIVERED'
    },
    {
      id: 'WND-2024-005',
      date: 'April 8, 2024',
      total: 537,
      status: 'delivered',
      items: [
        { name: 'Coconut Crunch', qty: 1, price: 215, fiber: 4.0, protein: 5.2, sugar: 3.5 },
        { name: 'Herbal Variety Pack', qty: 1, price: 269, fiber: 4.3, protein: 6.5, sugar: 2.2 }
      ],
      tracking: 'DELIVERED'
    }
  ];

  // Calculate nutrition summary from orders
  const nutritionSummary = useMemo(() => {
    const delivered = orders.filter(o => o.status === 'delivered');
    let totalFiber = 0, totalProtein = 0, totalSugar = 0;
    
    delivered.forEach(order => {
      order.items.forEach(item => {
        totalFiber += (item.fiber || 0) * item.qty;
        totalProtein += (item.protein || 0) * item.qty;
        totalSugar += (item.sugar || 0) * item.qty;
      });
    });

    return {
      fiber: totalFiber.toFixed(1),
      protein: totalProtein.toFixed(1),
      sugar: totalSugar.toFixed(1)
    };
  }, [orders]);

  // Calculate favorite products
  const favoriteProducts = useMemo(() => {
    const productCount = {};
    orders.filter(o => o.status === 'delivered').forEach(order => {
      order.items.forEach(item => {
        productCount[item.name] = (productCount[item.name] || 0) + item.qty;
      });
    });
    
    return Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }, [orders]);

  // Loyalty tier configuration
  const tierConfig = {
    bronze: { name: 'Bronze', icon: '🥉', min: 0, max: 999, color: '#CD7F32' },
    silver: { name: 'Silver', icon: '🥈', min: 1000, max: 2499, color: '#C0C0C0' },
    gold: { name: 'Gold', icon: '🥇', min: 2500, max: 4999, color: '#FFD700' },
    platinum: { name: 'Platinum', icon: '💎', min: 5000, max: Infinity, color: '#E5E4E2' }
  };

  const currentTier = tierConfig[userData.tier];
  const nextTierKey = userData.tier === 'bronze' ? 'silver' : 
                      userData.tier === 'silver' ? 'gold' : 
                      userData.tier === 'gold' ? 'platinum' : null;
  const nextTier = nextTierKey ? tierConfig[nextTierKey] : null;
  const tierProgress = nextTier ? 
    ((userData.points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Mock addresses
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Aishwarya',
      street: 'Basavanahalli Main Road',
      city: 'Mysuru',
      state: 'Karnataka',
      pincode: '570032',
      phone: '+91 96861 53413',
      isDefault: true
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FiCheck />;
      case 'shipped': return <FiTruck />;
      case 'processing': return <FiClock />;
      default: return <FiPackage />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      default: return '';
    }
  };

  return (
    <div className="account-page">
      <div className="container">
        {/* Account Header */}
        <motion.div 
          className="account-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="user-info">
            <div className="user-avatar">
              <FiUser />
            </div>
            <div className="user-details">
              <h1>{userData.name}</h1>
              <p>{userData.email} • Member since {userData.memberSince}</p>
            </div>
          </div>
          <button className="btn-edit-profile">
            <FiEdit3 /> Edit Profile
          </button>
        </motion.div>

        {/* Account Tabs */}
        <motion.div 
          className="account-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiGrid /> Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage /> My Orders
          </button>
          <button 
            className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <FiAward /> Rewards
          </button>
          <button 
            className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            <FiActivity /> Health
          </button>
          <button 
            className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <FiMapPin /> Addresses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <FiHeart /> Wishlist
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> Settings
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          className="account-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Dashboard Overview</h2>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <motion.div className="stat-card" whileHover={{ y: -4 }}>
                  <div className="stat-icon orders-icon">
                    <FiPackage />
                  </div>
                  <div className="stat-details">
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                  </div>
                </motion.div>

                <motion.div className="stat-card" whileHover={{ y: -4 }}>
                  <div className="stat-icon wishlist-icon">
                    <FiHeart />
                  </div>
                  <div className="stat-details">
                    <h3>{wishlistItems.length}</h3>
                    <p>Wishlist Items</p>
                  </div>
                </motion.div>

                <motion.div className="stat-card" whileHover={{ y: -4 }}>
                  <div className="stat-icon points-icon">
                    <FiStar />
                  </div>
                  <div className="stat-details">
                    <h3>{userData.points}</h3>
                    <p>Reward Points</p>
                  </div>
                </motion.div>

                <motion.div className="stat-card" whileHover={{ y: -4 }}>
                  <div className="stat-icon tier-icon">
                    <div className="tier-emoji">{currentTier.icon}</div>
                  </div>
                  <div className="stat-details">
                    <h3>{currentTier.name}</h3>
                    <p>Loyalty Tier</p>
                  </div>
                </motion.div>
              </div>

              {/* Recent Orders Preview */}
              <div className="dashboard-recent-orders">
                <div className="section-header">
                  <h3>Recent Orders</h3>
                  <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
                    View All <FiChevronDown style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                </div>
                <div className="recent-orders-list">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="recent-order-item">
                      <div className="recent-order-info">
                        <span className="recent-order-id">#{order.id}</span>
                        <span className="recent-order-date">{order.date}</span>
                      </div>
                      <span className={`order-status-mini ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className="recent-order-total">₹{order.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                  <a href="/shop" className="quick-action-btn">
                    <FiShoppingBag />
                    <span>Shop Now</span>
                  </a>
                  <button className="quick-action-btn" onClick={() => setActiveTab('wishlist')}>
                    <FiHeart />
                    <span>My Wishlist</span>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('rewards')}>
                    <FiGift />
                    <span>Rewards</span>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('health')}>
                    <FiActivity />
                    <span>Health Insights</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="section-header">
                <h2>Order History</h2>
                <span className="order-count">{orders.length} orders</span>
              </div>

              {orders.length === 0 ? (
                <div className="empty-orders">
                  <FiPackage className="empty-icon" />
                  <h3>No orders yet</h3>
                  <p>Start shopping to see your orders here!</p>
                  <a href="/shop" className="btn btn-primary">Shop Now</a>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <motion.div 
                      key={order.id}
                      className="order-card collapsible"
                      whileHover={{ y: -2 }}
                    >
                      <div 
                        className="order-header clickable"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        <div className="order-info">
                          <span className="order-id">Order #{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-header-right">
                          <div className={`order-status ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status.toUpperCase()}</span>
                          </div>
                          <button className="expand-btn">
                            {expandedOrders[order.id] ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </div>
                      </div>

                      <div className="order-summary">
                        <span className="order-items-count">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                        <span className="order-total-mini">₹{order.total}</span>
                      </div>

                      <AnimatePresence>
                        {expandedOrders[order.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="order-details-expanded"
                          >
                            <div className="order-items">
                              {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-qty">x{item.qty}</span>
                                  <span className="item-price">₹{item.price * item.qty}</span>
                                </div>
                              ))}
                            </div>

                            <div className="order-footer">
                              <div className="order-total">
                                <span>Total</span>
                                <strong>₹{order.total}</strong>
                              </div>
                              <div className="order-actions">
                                <button className="btn-track">
                                  <FiTruck /> Track Order
                                </button>
                                <button className="btn-reorder">
                                  Buy Again
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="rewards-section">
              <div className="section-header">
                <h2>Rewards Program</h2>
                <span className="coming-soon-tag">Coming Soon</span>
              </div>

              {/* Points Balance Card */}
              <div className="rewards-balance-card">
                <div className="balance-header">
                  <div className="balance-info">
                    <p className="balance-label">Your Points Balance</p>
                    <h2 className="balance-amount">{userData.points}</h2>
                  </div>
                  <div className="tier-badge" style={{ borderColor: currentTier.color }}>
                    <span className="tier-icon-large">{currentTier.icon}</span>
                    <span className="tier-name">{currentTier.name}</span>
                  </div>
                </div>

                {/* Tier Progress */}
                {nextTier && (
                  <div className="tier-progress-section">
                    <div className="progress-info">
                      <span>Progress to {nextTier.name} {nextTier.icon}</span>
                      <span>{nextTier.min - userData.points} points to go</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${tierProgress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ background: `linear-gradient(135deg, ${currentTier.color}, ${nextTier.color})` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* How to Earn Points */}
              <div className="earn-points-section">
                <h3>How to Earn Points</h3>
                <div className="earn-points-grid">
                  <div className="earn-point-card">
                    <div className="earn-icon">
                      <FiShoppingBag />
                    </div>
                    <h4>Make a Purchase</h4>
                    <p>Earn 1 point for every ₹1 spent</p>
                  </div>
                  <div className="earn-point-card">
                    <div className="earn-icon">
                      <FiStar />
                    </div>
                    <h4>Write a Review</h4>
                    <p>Get 50 bonus points per review</p>
                  </div>
                  <div className="earn-point-card">
                    <div className="earn-icon">
                      <FiGift />
                    </div>
                    <h4>Birthday Bonus</h4>
                    <p>Receive 200 points on your birthday</p>
                  </div>
                  <div className="earn-point-card">
                    <div className="earn-icon">
                      <FiUser />
                    </div>
                    <h4>Refer a Friend</h4>
                    <p>Earn 100 points per referral</p>
                  </div>
                </div>
              </div>

              {/* Available Rewards */}
              <div className="available-rewards-section">
                <h3>Available Rewards</h3>
                <div className="rewards-list">
                  <div className="reward-item locked">
                    <div className="reward-info">
                      <h4>₹50 Off Your Next Order</h4>
                      <p>500 points required</p>
                    </div>
                    <button className="redeem-btn" disabled>
                      {userData.points >= 500 ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                  <div className="reward-item locked">
                    <div className="reward-info">
                      <h4>₹100 Off Your Next Order</h4>
                      <p>1000 points required</p>
                    </div>
                    <button className="redeem-btn" disabled>
                      {userData.points >= 1000 ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                  <div className="reward-item locked">
                    <div className="reward-info">
                      <h4>Free Shipping on Next Order</h4>
                      <p>750 points required</p>
                    </div>
                    <button className="redeem-btn" disabled>
                      {userData.points >= 750 ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                  <div className="reward-item locked">
                    <div className="reward-info">
                      <h4>Exclusive Product Sample</h4>
                      <p>1500 points required</p>
                    </div>
                    <button className="redeem-btn" disabled>
                      {userData.points >= 1500 ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Points History */}
              <div className="points-history-section">
                <h3>Recent Points Activity</h3>
                <div className="points-history-list">
                  <div className="points-history-item earned">
                    <div className="history-icon">+</div>
                    <div className="history-details">
                      <p className="history-action">Purchase - Order #WND-2024-001</p>
                      <p className="history-date">April 12, 2024</p>
                    </div>
                    <div className="history-points">+645</div>
                  </div>
                  <div className="points-history-item earned">
                    <div className="history-icon">+</div>
                    <div className="history-details">
                      <p className="history-action">Purchase - Order #WND-2024-002</p>
                      <p className="history-date">April 15, 2024</p>
                    </div>
                    <div className="history-points">+430</div>
                  </div>
                  <div className="points-history-item earned">
                    <div className="history-icon">+</div>
                    <div className="history-details">
                      <p className="history-action">Product Review Bonus</p>
                      <p className="history-date">April 13, 2024</p>
                    </div>
                    <div className="history-points">+50</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Health Insights Tab */}
          {activeTab === 'health' && (
            <div className="health-section">
              <div className="section-header">
                <h2>Health Insights</h2>
                <span className="period-label">This Month</span>
              </div>

              {/* Nutrition Summary */}
              <div className="nutrition-summary">
                <h3>Nutrition from Your Orders</h3>
                <div className="nutrition-cards">
                  <motion.div 
                    className="nutrition-card fiber"
                    whileHover={{ y: -4 }}
                  >
                    <div className="nutrition-icon">
                      <FiTrendingUp />
                    </div>
                    <div className="nutrition-details">
                      <h4>{nutritionSummary.fiber}g</h4>
                      <p>Total Fiber</p>
                    </div>
                    <div className="nutrition-badge good">Excellent</div>
                  </motion.div>

                  <motion.div 
                    className="nutrition-card protein"
                    whileHover={{ y: -4 }}
                  >
                    <div className="nutrition-icon">
                      <FiActivity />
                    </div>
                    <div className="nutrition-details">
                      <h4>{nutritionSummary.protein}g</h4>
                      <p>Total Protein</p>
                    </div>
                    <div className="nutrition-badge good">Great</div>
                  </motion.div>

                  <motion.div 
                    className="nutrition-card sugar"
                    whileHover={{ y: -4 }}
                  >
                    <div className="nutrition-icon">
                      <FiCheck />
                    </div>
                    <div className="nutrition-details">
                      <h4>{nutritionSummary.sugar}g</h4>
                      <p>Total Sugar</p>
                    </div>
                    <div className="nutrition-badge good">Low</div>
                  </motion.div>
                </div>
              </div>

              {/* Favorite Products */}
              <div className="favorite-products-section">
                <h3>Your Favorite Products</h3>
                <div className="favorite-products-list">
                  {favoriteProducts.map((product, index) => (
                    <div key={index} className="favorite-product-item">
                      <div className="favorite-rank">#{index + 1}</div>
                      <div className="favorite-product-info">
                        <h4>{product.name}</h4>
                        <p>Ordered {product.count} time{product.count > 1 ? 's' : ''}</p>
                      </div>
                      <button className="reorder-favorite-btn">
                        <FiShoppingBag /> Buy Again
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tips */}
              <div className="health-tips-section">
                <h3>Personalized Recommendations</h3>
                <div className="health-tips-grid">
                  <div className="health-tip-card">
                    <div className="tip-icon">💡</div>
                    <h4>Great Fiber Intake!</h4>
                    <p>You're consuming healthy amounts of fiber from our millet products. Keep it up!</p>
                  </div>
                  <div className="health-tip-card">
                    <div className="tip-icon">🌟</div>
                    <h4>Try Our New Range</h4>
                    <p>Based on your preferences, you might love our Moringa Energy Thins for extra protein.</p>
                  </div>
                  <div className="health-tip-card">
                    <div className="tip-icon">🥗</div>
                    <h4>Balanced Snacking</h4>
                    <p>Your low-GI snack choices are helping maintain stable blood sugar levels.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="addresses-section">
              <div className="section-header">
                <h2>Saved Addresses</h2>
                <button className="btn-add-address">
                  <FiPlus /> Add New Address
                </button>
              </div>

              <div className="addresses-grid">
                {addresses.map((address) => (
                  <motion.div 
                    key={address.id}
                    className="address-card"
                    whileHover={{ y: -2 }}
                  >
                    {address.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                    <div className="address-type">
                      <FiHome /> {address.type}
                    </div>
                    <div className="address-details">
                      <p className="address-name">{address.name}</p>
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p className="address-phone">{address.phone}</p>
                    </div>
                    <div className="address-actions">
                      <button className="btn-edit">
                        <FiEdit3 /> Edit
                      </button>
                      {!address.isDefault && (
                        <button className="btn-set-default">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              <div className="section-header">
                <h2>My Wishlist</h2>
                <a href="/wishlist" className="view-all-link">View All →</a>
              </div>
              {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                  <FiHeart className="empty-icon" />
                  <h3>Your wishlist is empty</h3>
                  <p>Save your favorite products here!</p>
                  <a href="/shop" className="btn btn-primary">Browse Products</a>
                </div>
              ) : (
                <p className="wishlist-preview">
                  You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist. 
                  <a href="/wishlist"> View and manage your wishlist →</a>
                </p>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              
              <div className="settings-group">
                <h3>Profile Information</h3>
                <div className="setting-item">
                  <label>Full Name</label>
                  <div className="setting-value">
                    <span>{userData.name}</span>
                    <button className="btn-edit-inline">
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Email Address</label>
                  <div className="setting-value">
                    <span>{userData.email}</span>
                    <button className="btn-edit-inline">
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Phone Number</label>
                  <div className="setting-value">
                    <span>{userData.phone}</span>
                    <button className="btn-edit-inline">
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h3>Preferences</h3>
                <div className="setting-item">
                  <label>Email Notifications</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <label>SMS Updates</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <h3>Account Actions</h3>
                <button className="btn-logout">
                  <FiLogOut /> Sign Out
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder;
