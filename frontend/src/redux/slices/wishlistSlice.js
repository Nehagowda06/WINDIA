// src/redux/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('wishlistItems');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: loadWishlist(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.find((i) => i._id === action.payload._id);
      if (!exists) {
        state.wishlistItems.push(action.payload);
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((i) => i._id !== action.payload);
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem('wishlistItems');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;