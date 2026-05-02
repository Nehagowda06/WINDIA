import { addToCart as addToCartAction, removeFromCart, updateQuantity, clearCart } from '../slices/cartSlice';

export const addToCart = (product) => (dispatch) => {
  dispatch(addToCartAction(product));
};

export const removeFromCartAction = (id) => (dispatch) => {
  dispatch(removeFromCart(id));
};

export const updateCartQuantity = (id, qty) => (dispatch) => {
  dispatch(updateQuantity({ id, qty }));
};

export const clearCartAction = () => (dispatch) => {
  dispatch(clearCart());
};
