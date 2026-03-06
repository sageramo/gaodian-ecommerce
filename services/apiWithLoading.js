import { store } from '../store';
import { setIsLoading } from '../store/slices/uiSlice';
import * as apiServices from './api';

/**
 * Wrapper function that adds loading state management to API calls
 * @param {Function} apiFunction - The API function to wrap
 * @param {boolean} showLoading - Whether to show global loading indicator (default: true)
 * @returns {Function} Wrapped function with loading state management
 */
const withLoading = (apiFunction, showLoading = true) => {
  return async (...args) => {
    try {
      // Show loading indicator
      if (showLoading) {
        store.dispatch(setIsLoading(true));
      }

      // Call the API function
      const result = await apiFunction(...args);

      return result;
    } catch (error) {
      // Re-throw error to be handled by caller
      throw error;
    } finally {
      // Hide loading indicator
      if (showLoading) {
        store.dispatch(setIsLoading(false));
      }
    }
  };
};

/**
 * Create wrapped versions of all API services with loading state management
 * Each function automatically shows/hides the global loading indicator
 */

// Product API with loading
export const getProducts = withLoading(apiServices.getProducts);
export const getProductById = withLoading(apiServices.getProductById);
export const searchProducts = withLoading(apiServices.searchProducts);
export const getProductsByHeritageType = withLoading(apiServices.getProductsByHeritageType);

// User API with loading
export const registerUser = withLoading(apiServices.registerUser);
export const loginUser = withLoading(apiServices.loginUser);
export const getUserProfile = withLoading(apiServices.getUserProfile);
export const updateUserProfile = withLoading(apiServices.updateUserProfile);
export const requestPasswordReset = withLoading(apiServices.requestPasswordReset);
export const resetPassword = withLoading(apiServices.resetPassword);
export const logoutUser = withLoading(apiServices.logoutUser);

// Cart API with loading (some operations don't need global loading)
export const getCart = withLoading(apiServices.getCart);
export const syncCart = withLoading(apiServices.syncCart);
export const addToCart = withLoading(apiServices.addToCart, false); // Silent operation
export const updateCartItem = withLoading(apiServices.updateCartItem, false); // Silent operation
export const removeFromCart = withLoading(apiServices.removeFromCart, false); // Silent operation
export const clearCart = withLoading(apiServices.clearCart);

// Order API with loading
export const createOrder = withLoading(apiServices.createOrder);
export const getOrders = withLoading(apiServices.getOrders);
export const getOrderById = withLoading(apiServices.getOrderById);
export const updateOrderStatus = withLoading(apiServices.updateOrderStatus);
export const cancelOrder = withLoading(apiServices.cancelOrder);
export const processPayment = withLoading(apiServices.processPayment);
export const getOrderTracking = withLoading(apiServices.getOrderTracking);

// Address API with loading
export const getAddresses = withLoading(apiServices.getAddresses);
export const addAddress = withLoading(apiServices.addAddress);
export const updateAddress = withLoading(apiServices.updateAddress);
export const deleteAddress = withLoading(apiServices.deleteAddress);
export const setDefaultAddress = withLoading(apiServices.setDefaultAddress);

// Heritage Content API with loading
export const getHeritageContent = withLoading(apiServices.getHeritageContent);
export const getHeritageByType = withLoading(apiServices.getHeritageByType);

/**
 * Export the withLoading utility for custom use cases
 * Usage: const myApiCall = withLoading(myApiFunction, showLoading);
 */
export { withLoading };

/**
 * Export all original API services without loading for cases where
 * manual loading state management is preferred
 */
export * as apiWithoutLoading from './api';
