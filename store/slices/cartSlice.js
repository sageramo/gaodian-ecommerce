import { createSlice } from '@reduxjs/toolkit';
import { calculateItemSubtotal } from '../../models/CartItem.js';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

/**
 * Calculate cart totals
 * @param {Array} items - Cart items
 * @returns {Object} { totalAmount, totalItems }
 */
const calculateTotals = (items) => {
  const totalAmount = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalAmount, totalItems };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart or increase quantity if already exists
     * @param {Object} action.payload - { productId, name, price, image, quantity }
     */
    addToCart: (state, action) => {
      const { productId, name, price, image, quantity = 1 } = action.payload;
      
      const existingItem = state.items.find((item) => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          name,
          price,
          quantity,
          image,
          addedAt: new Date().toISOString(),
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
    },
    
    /**
     * Remove item from cart
     * @param {Object} action.payload - productId
     */
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
    },
    
    /**
     * Update item quantity
     * @param {Object} action.payload - { productId, quantity }
     */
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.productId !== productId);
      } else {
        const item = state.items.find((item) => item.productId === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
    },
    
    /**
     * Clear all items from cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    
    /**
     * Load cart from storage
     * @param {Object} action.payload - { items }
     */
    loadCart: (state, action) => {
      const { items } = action.payload;
      state.items = items || [];
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
    },
    
    /**
     * Merge cart items (used when user logs in)
     * @param {Object} action.payload - { items } from server
     */
    mergeCart: (state, action) => {
      const serverItems = action.payload.items || [];
      
      // Merge server items with local items
      serverItems.forEach((serverItem) => {
        const localItem = state.items.find((item) => item.productId === serverItem.productId);
        
        if (localItem) {
          // Keep the higher quantity
          localItem.quantity = Math.max(localItem.quantity, serverItem.quantity);
          // Keep the earlier addedAt timestamp
          if (new Date(serverItem.addedAt) < new Date(localItem.addedAt)) {
            localItem.addedAt = serverItem.addedAt;
          }
        } else {
          state.items.push(serverItem);
        }
      });
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart, mergeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
