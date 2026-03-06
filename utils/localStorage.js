/**
 * Local storage utility functions with validation and error handling
 */

import { validateCartItem } from '../models/CartItem.js';

// Storage keys constants
export const STORAGE_KEYS = {
  CART: 'gaodian_cart',
  LANGUAGE: 'gaodian_language',
  USER: 'gaodian_user',
  AUTH_TOKEN: 'gaodian_auth_token',
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

/**
 * Generic storage utility
 */
export const storage = {
  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed value or default value
   */
  get(key, defaultValue = null) {
    if (!isLocalStorageAvailable()) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return defaultValue;
      }

      const parsed = JSON.parse(item);
      return parsed;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error?.message || String(error));
      // If data is corrupted, remove it
      this.remove(key);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} Success status
   */
  set(key, value) {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error?.message || String(error));
      
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded. Consider clearing old data.');
      }
      
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error?.message || String(error));
      return false;
    }
  },

  /**
   * Clear all items from localStorage
   * @returns {boolean} Success status
   */
  clear() {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error?.message || String(error));
      return false;
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} True if key exists
   */
  has(key) {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key (${key}):`, error?.message || String(error));
      return false;
    }
  },
};

/**
 * Cart-specific storage functions with validation
 */
export const cartStorage = {
  /**
   * Get cart from localStorage
   * @returns {Object} Cart data { items: [], totalAmount: 0, totalItems: 0 }
   */
  getCart() {
    const defaultCart = { items: [], totalAmount: 0, totalItems: 0 };
    const cart = storage.get(STORAGE_KEYS.CART, defaultCart);

    // Validate cart structure
    if (!cart || typeof cart !== 'object') {
      console.warn('Invalid cart data in localStorage, returning default cart');
      this.clearCart();
      return defaultCart;
    }

    // Validate cart items
    if (!Array.isArray(cart.items)) {
      console.warn('Invalid cart items in localStorage, returning default cart');
      this.clearCart();
      return defaultCart;
    }

    // Validate each cart item
    const validItems = cart.items.filter((item) => {
      const validation = validateCartItem(item);
      if (!validation.valid) {
        console.warn('Invalid cart item found:', validation.errors);
        return false;
      }
      return true;
    });

    // If some items were invalid, update the cart
    if (validItems.length !== cart.items.length) {
      console.warn(`Removed ${cart.items.length - validItems.length} invalid items from cart`);
      const updatedCart = {
        items: validItems,
        totalAmount: cart.totalAmount || 0,
        totalItems: cart.totalItems || 0,
      };
      this.saveCart(updatedCart);
      return updatedCart;
    }

    return cart;
  },

  /**
   * Save cart to localStorage
   * @param {Object} cart - Cart data
   * @returns {boolean} Success status
   */
  saveCart(cart) {
    if (!cart || typeof cart !== 'object') {
      console.error('Invalid cart data provided');
      return false;
    }

    // Ensure cart has required structure
    const cartData = {
      items: Array.isArray(cart.items) ? cart.items : [],
      totalAmount: typeof cart.totalAmount === 'number' ? cart.totalAmount : 0,
      totalItems: typeof cart.totalItems === 'number' ? cart.totalItems : 0,
    };

    return storage.set(STORAGE_KEYS.CART, cartData);
  },

  /**
   * Clear cart from localStorage
   * @returns {boolean} Success status
   */
  clearCart() {
    return storage.remove(STORAGE_KEYS.CART);
  },

  /**
   * Check if cart exists in localStorage
   * @returns {boolean} True if cart exists
   */
  hasCart() {
    return storage.has(STORAGE_KEYS.CART);
  },
};

/**
 * User-specific storage functions
 */
export const userStorage = {
  /**
   * Get user from localStorage
   * @returns {Object|null} User data or null
   */
  getUser() {
    return storage.get(STORAGE_KEYS.USER, null);
  },

  /**
   * Save user to localStorage
   * @param {Object} user - User data
   * @returns {boolean} Success status
   */
  saveUser(user) {
    if (!user || typeof user !== 'object') {
      console.error('Invalid user data provided');
      return false;
    }
    return storage.set(STORAGE_KEYS.USER, user);
  },

  /**
   * Clear user from localStorage
   * @returns {boolean} Success status
   */
  clearUser() {
    return storage.remove(STORAGE_KEYS.USER);
  },

  /**
   * Get auth token from localStorage
   * @returns {string|null} Auth token or null
   */
  getAuthToken() {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
  },

  /**
   * Save auth token to localStorage
   * @param {string} token - Auth token
   * @returns {boolean} Success status
   */
  saveAuthToken(token) {
    if (!token || typeof token !== 'string') {
      console.error('Invalid auth token provided');
      return false;
    }
    return storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Clear auth token from localStorage
   * @returns {boolean} Success status
   */
  clearAuthToken() {
    return storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Clear all user-related data
   * @returns {boolean} Success status
   */
  clearAll() {
    const userCleared = this.clearUser();
    const tokenCleared = this.clearAuthToken();
    return userCleared && tokenCleared;
  },
};

/**
 * Language-specific storage functions
 */
export const languageStorage = {
  /**
   * Get language from localStorage
   * @returns {string} Language code (default: 'zh')
   */
  getLanguage() {
    return storage.get(STORAGE_KEYS.LANGUAGE, 'zh');
  },

  /**
   * Save language to localStorage
   * @param {string} language - Language code ('zh', 'en', 'ja')
   * @returns {boolean} Success status
   */
  saveLanguage(language) {
    const validLanguages = ['zh', 'en', 'ja'];
    if (!validLanguages.includes(language)) {
      console.error('Invalid language code provided');
      return false;
    }
    return storage.set(STORAGE_KEYS.LANGUAGE, language);
  },
};

export default storage;
