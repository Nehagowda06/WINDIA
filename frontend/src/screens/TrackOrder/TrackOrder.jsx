'use client';

import React, { useState } from 'react';
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
  FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './TrackOrder.css';

const TrackOrder = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { user } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Aishwarya',
    email: 'aish36@gmail.com',
    phone: '+91 96861 53413',
    memberSince: 'January 2026'
  });
  const [editData, setEditData] = useState({ ...userData });

  const handleSave = () => {
    setUserData({ ...editData, memberSince: userData.memberSince });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  // Mock orders data
  const orders = [
    {
      id: 'WND-2024-001',
      date: 'April 12, 2024',
      total: 645,
      status: 'delivered',
      items: [
        { name: 'Methi Thins', qty: 2, price: 215 },
        { name: 'Garlic Thins', qty: 1, price: 215 }
      ],
      tracking: 'DELIVERED'
    },
    {
      id: 'WND-2024-002',
      date: 'April 15, 2024',
      total: 430,
      status: 'shipped',
      items: [
        { name: 'Jeera Thins', qty: 2, price: 215 }
      ],
      tracking: 'IN TRANSIT'
    },
    {
      id: 'WND-2024-003',
      date: 'April 16, 2024',
      total: 215,
      status: 'processing',
      items: [
        { name: 'Moringa Thins', qty: 1, price: 215 }
      ],
      tracking: 'PROCESSING'
    }
  ];

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
          <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
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
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage /> My Orders
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
                      className="order-card"
                      whileHover={{ y: -2 }}
                    >
                      <div className="order-header">
                        <div className="order-info">
                          <span className="order-id">Order #{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className={`order-status ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status.toUpperCase()}</span>
                        </div>
                      </div>

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
                  ))}
                </div>
              )}
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
              <p className="wishlist-preview">
                You have 4 items in your wishlist. 
                <a href="/wishlist"> View and manage your wishlist →</a>
              </p>
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
                    <button className="btn-edit-inline" onClick={() => setIsEditing(true)}>
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Email Address</label>
                  <div className="setting-value">
                    <span>{userData.email}</span>
                    <button className="btn-edit-inline" onClick={() => setIsEditing(true)}>
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Phone Number</label>
                  <div className="setting-value">
                    <span>{userData.phone}</span>
                    <button className="btn-edit-inline" onClick={() => setIsEditing(true)}>
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

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Edit Profile</h2>
                <button className="modal-close" onClick={handleCancel}>
                  <FiX />
                </button>
              </div>

              <div className="modal-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={e => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div className="modal-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={e => setEditData({ ...editData, email: e.target.value })}
                  placeholder="Your email"
                />
              </div>

              <div className="modal-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={e => setEditData({ ...editData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                <button className="btn-save" onClick={handleSave}>Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackOrder;