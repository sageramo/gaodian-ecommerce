import { createSlice } from '@reduxjs/toolkit';
import { OrderStatus, PaymentStatus } from '../../models/Order.js';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /**
     * Set loading state
     * @param {Object} action.payload - boolean
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    /**
     * Set error state
     * @param {Object} action.payload - error message
     */
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /**
     * Set orders list
     * @param {Object} action.payload - array of orders
     */
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Add a new order
     * @param {Object} action.payload - order object
     */
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Set current order (for detail page)
     * @param {Object} action.payload - order object
     */
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Clear current order
     */
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    /**
     * Update order status
     * @param {Object} action.payload - { orderId, status }
     */
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
      }
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.status = status;
        state.currentOrder.updatedAt = new Date().toISOString();
      }
    },

    /**
     * Update payment status
     * @param {Object} action.payload - { orderId, paymentStatus }
     */
    updatePaymentStatus: (state, action) => {
      const { orderId, paymentStatus } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.paymentStatus = paymentStatus;
        order.updatedAt = new Date().toISOString();
        
        // Auto-update order status based on payment status
        if (paymentStatus === PaymentStatus.COMPLETED && order.status === OrderStatus.PENDING) {
          order.status = OrderStatus.PAID;
        }
      }
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.paymentStatus = paymentStatus;
        state.currentOrder.updatedAt = new Date().toISOString();
        
        if (
          paymentStatus === PaymentStatus.COMPLETED &&
          state.currentOrder.status === OrderStatus.PENDING
        ) {
          state.currentOrder.status = OrderStatus.PAID;
        }
      }
    },

    /**
     * Update tracking number
     * @param {Object} action.payload - { orderId, trackingNumber }
     */
    updateTrackingNumber: (state, action) => {
      const { orderId, trackingNumber } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.trackingNumber = trackingNumber;
        order.updatedAt = new Date().toISOString();
      }
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.trackingNumber = trackingNumber;
        state.currentOrder.updatedAt = new Date().toISOString();
      }
    },

    /**
     * Cancel order
     * @param {Object} action.payload - orderId
     */
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = OrderStatus.CANCELLED;
        order.updatedAt = new Date().toISOString();
      }
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.status = OrderStatus.CANCELLED;
        state.currentOrder.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setOrders,
  addOrder,
  setCurrentOrder,
  clearCurrentOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updateTrackingNumber,
  cancelOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
