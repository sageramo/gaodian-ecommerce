/**
 * Store initialization functions
 */

import { cartStorage, languageStorage, userStorage } from '../utils/localStorage.js';
import { loadCart } from './slices/cartSlice.js';
import { setLanguage } from './slices/uiSlice.js';
import { loginSuccess } from './slices/authSlice.js';
import { setProducts } from './slices/productsSlice.js';
import { getAllProducts } from '../data/products.js';

/**
 * Initialize store with data from localStorage
 * @param {Object} store - Redux store
 */
export const initializeStore = (store) => {
  // Load products from data file
  try {
    const products = getAllProducts();
    store.dispatch(setProducts(products));
    console.log('Products loaded:', products.length);
  } catch (error) {
    console.error('Error loading products:', error?.message || String(error));
  }

  // Load cart from localStorage
  if (cartStorage.hasCart()) {
    try {
      const cart = cartStorage.getCart();
      store.dispatch(loadCart(cart));
      console.log('Cart loaded from localStorage:', JSON.stringify(cart));
    } catch (error) {
      console.error('Error loading cart from localStorage:', error?.message || String(error));
      cartStorage.clearCart();
    }
  }

  // Load language from localStorage
  try {
    const language = languageStorage.getLanguage();
    store.dispatch(setLanguage(language));
    console.log('Language loaded from localStorage:', language);
  } catch (error) {
    console.error('Error loading language from localStorage:', error?.message || String(error));
  }

  // Load user from localStorage (if exists)
  try {
    const user = userStorage.getUser();
    const token = userStorage.getAuthToken();
    
    if (user && token) {
      store.dispatch(loginSuccess(user));
      console.log('User loaded from localStorage:', JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error?.message || String(error));
    userStorage.clearAll();
  }
};

export default initializeStore;
