/**
 * Redux middleware to sync cart state to localStorage
 */

import { cartStorage } from '../../utils/localStorage.js';

/**
 * Middleware that syncs cart state to localStorage after cart actions
 */
export const cartSyncMiddleware = (store) => (next) => (action) => {
  // Execute the action first
  const result = next(action);

  // Check if this is a cart action
  if (action.type?.startsWith('cart/')) {
    // Get the updated cart state
    const state = store.getState();
    const cart = state.cart;

    // Save to localStorage
    cartStorage.saveCart({
      items: cart.items,
      totalAmount: cart.totalAmount,
      totalItems: cart.totalItems,
    });
  }

  return result;
};

export default cartSyncMiddleware;
