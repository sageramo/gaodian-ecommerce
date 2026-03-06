import { createSlice } from '@reduxjs/toolkit';

/**
 * Toast Slice
 * Manages toast notification state
 */

let nextToastId = 1;

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    /**
     * Add a new toast notification
     * @param {Object} action.payload - Toast configuration
     * @param {string} action.payload.type - Toast type ('success', 'error', 'warning', 'info')
     * @param {string} action.payload.message - Toast message
     * @param {string} action.payload.title - Optional toast title
     * @param {number} action.payload.duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
     */
    addToast: (state, action) => {
      const toast = {
        id: nextToastId++,
        type: action.payload.type || 'info',
        message: action.payload.message,
        title: action.payload.title || null,
        duration: action.payload.duration !== undefined ? action.payload.duration : 5000,
      };
      state.toasts.push(toast);
    },

    /**
     * Remove a toast by ID
     */
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },

    /**
     * Clear all toasts
     */
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;

/**
 * Helper action creators for common toast types
 */

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {string} title - Optional title
 * @param {number} duration - Optional duration (default: 5000ms)
 */
export const showSuccess = (message, title = null, duration = 5000) => {
  return addToast({ type: 'success', message, title, duration });
};

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {string} title - Optional title
 * @param {number} duration - Optional duration (default: 7000ms for errors)
 */
export const showError = (message, title = null, duration = 7000) => {
  return addToast({ type: 'error', message, title, duration });
};

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {string} title - Optional title
 * @param {number} duration - Optional duration (default: 6000ms)
 */
export const showWarning = (message, title = null, duration = 6000) => {
  return addToast({ type: 'warning', message, title, duration });
};

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {string} title - Optional title
 * @param {number} duration - Optional duration (default: 5000ms)
 */
export const showInfo = (message, title = null, duration = 5000) => {
  return addToast({ type: 'info', message, title, duration });
};

export default toastSlice.reducer;
