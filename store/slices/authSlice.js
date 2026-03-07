import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Start login process
     */
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /**
     * Login success
     * @param {Object} action.payload - user object
     */
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    /**
     * Login failure
     * @param {Object} action.payload - error message
     */
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    /**
     * Start registration process
     */
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /**
     * Registration success
     * @param {Object} action.payload - user object
     */
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    /**
     * Registration failure
     * @param {Object} action.payload - error message
     */
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    /**
     * Logout user
     */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },

    /**
     * Update user profile
     * @param {Object} action.payload - updated user data
     */
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    /**
     * Add address to user
     * @param {Object} action.payload - address object
     */
    addAddress: (state, action) => {
      if (state.user) {
        state.user.addresses.push(action.payload);
      }
    },

    /**
     * Update address
     * @param {Object} action.payload - { addressId, updates }
     */
    updateAddress: (state, action) => {
      if (state.user) {
        const { addressId, updates } = action.payload;
        const address = state.user.addresses.find((a) => a.id === addressId);
        if (address) {
          Object.assign(address, updates);
        }
      }
    },

    /**
     * Remove address
     * @param {Object} action.payload - addressId
     */
    removeAddress: (state, action) => {
      if (state.user) {
        const addressId = action.payload;
        state.user.addresses = state.user.addresses.filter((a) => a.id !== addressId);
      }
    },

    /**
     * Set default address
     * @param {Object} action.payload - addressId
     */
    setDefaultAddress: (state, action) => {
      if (state.user) {
        const addressId = action.payload;
        state.user.addresses.forEach((address) => {
          address.isDefault = address.id === addressId;
        });
      }
    },

    /**
     * Clear error
     */
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUser,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
