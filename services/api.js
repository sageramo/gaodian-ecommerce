import axios from 'axios';

/**
 * Create axios instance with default configuration
 * - baseURL: API endpoint (from env or default to localhost)
 * - timeout: 30 seconds
 * - headers: JSON content type
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * - Adds authentication token to requests if available
 * - Logs request details in development mode
 */
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error?.message || String(error));
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Extracts data from response
 * - Handles common HTTP errors
 * - Manages authentication errors
 */
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('[API Error] Unauthorized - redirecting to login');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/auth';
          break;
        case 403:
          console.error('[API Error] Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('[API Error] Resource not found');
          break;
        case 422:
          console.error('[API Error] Validation error:', JSON.stringify(data));
          break;
        case 500:
          console.error('[API Error] Server error');
          break;
        case 503:
          console.error('[API Error] Service unavailable');
          break;
        default:
          console.error('[API Error]', status, JSON.stringify(data));
      }
      
      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        errors: data?.errors || null,
      });
    } else if (error.request) {
      // Network error - no response received
      console.error('[API Error] Network error - no response received');
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: null,
      });
    } else {
      // Request setup error
      console.error('[API Error] Request error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message,
        errors: null,
      });
    }
  }
);

export default api;


// ============================================
// Product API Services
// ============================================

/**
 * Get all products with optional filters
 * @param {Object} params - Query parameters
 * @param {string} params.category - Filter by heritage type
 * @param {number} params.minPrice - Minimum price
 * @param {number} params.maxPrice - Maximum price
 * @param {boolean} params.inStock - Filter by stock availability
 * @param {string} params.search - Search keyword
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (params = {}) => {
  return api.get('/products', { params });
};

/**
 * Get product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (productId) => {
  return api.get(`/products/${productId}`);
};

/**
 * Search products by keyword
 * @param {string} keyword - Search keyword
 * @param {string} language - Language code ('zh', 'en', 'ja')
 * @returns {Promise<Array>} Matching products
 */
export const searchProducts = async (keyword, language = 'zh') => {
  return api.get('/products/search', {
    params: { q: keyword, lang: language },
  });
};

/**
 * Get products by heritage type
 * @param {string} heritageType - Heritage type ('mahjong', 'go', 'chess', etc.)
 * @returns {Promise<Array>} Products of specified type
 */
export const getProductsByHeritageType = async (heritageType) => {
  return api.get(`/products/heritage/${heritageType}`);
};

// ============================================
// User API Services
// ============================================

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User name
 * @returns {Promise<Object>} User data and auth token
 */
export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data and auth token
 */
export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials);
};

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async () => {
  return api.get('/auth/profile');
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (userData) => {
  return api.put('/auth/profile', userData);
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<Object>} Success message
 */
export const requestPasswordReset = async (email) => {
  return api.post('/auth/password-reset', { email });
};

/**
 * Reset password with token
 * @param {Object} data - Reset data
 * @param {string} data.token - Reset token
 * @param {string} data.password - New password
 * @returns {Promise<Object>} Success message
 */
export const resetPassword = async (data) => {
  return api.post('/auth/password-reset/confirm', data);
};

/**
 * Logout user
 * @returns {Promise<Object>} Success message
 */
export const logoutUser = async () => {
  return api.post('/auth/logout');
};

// ============================================
// Cart API Services
// ============================================

/**
 * Get user's cart from server
 * @returns {Promise<Object>} Cart data
 */
export const getCart = async () => {
  return api.get('/cart');
};

/**
 * Sync local cart to server
 * @param {Array} cartItems - Local cart items
 * @returns {Promise<Object>} Merged cart data
 */
export const syncCart = async (cartItems) => {
  return api.post('/cart/sync', { items: cartItems });
};

/**
 * Add item to cart
 * @param {Object} item - Cart item
 * @param {string} item.productId - Product ID
 * @param {number} item.quantity - Quantity
 * @returns {Promise<Object>} Updated cart
 */
export const addToCart = async (item) => {
  return api.post('/cart/items', item);
};

/**
 * Update cart item quantity
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart
 */
export const updateCartItem = async (productId, quantity) => {
  return api.put(`/cart/items/${productId}`, { quantity });
};

/**
 * Remove item from cart
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Updated cart
 */
export const removeFromCart = async (productId) => {
  return api.delete(`/cart/items/${productId}`);
};

/**
 * Clear entire cart
 * @returns {Promise<Object>} Empty cart
 */
export const clearCart = async () => {
  return api.delete('/cart');
};

// ============================================
// Order API Services
// ============================================

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @param {Array} orderData.items - Order items
 * @param {Object} orderData.shippingAddress - Shipping address
 * @param {string} orderData.paymentMethod - Payment method
 * @returns {Promise<Object>} Created order with order ID
 */
export const createOrder = async (orderData) => {
  return api.post('/orders', orderData);
};

/**
 * Get all orders for current user
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by order status
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Orders list with pagination
 */
export const getOrders = async (params = {}) => {
  return api.get('/orders', { params });
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (orderId) => {
  return api.get(`/orders/${orderId}`);
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  return api.put(`/orders/${orderId}/status`, { status });
};

/**
 * Cancel order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Cancelled order
 */
export const cancelOrder = async (orderId) => {
  return api.post(`/orders/${orderId}/cancel`);
};

/**
 * Process payment for order
 * @param {string} orderId - Order ID
 * @param {Object} paymentData - Payment data
 * @param {string} paymentData.paymentMethod - Payment method
 * @param {Object} paymentData.paymentDetails - Payment details
 * @returns {Promise<Object>} Payment result
 */
export const processPayment = async (orderId, paymentData) => {
  return api.post(`/orders/${orderId}/payment`, paymentData);
};

/**
 * Get order tracking information
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Tracking information
 */
export const getOrderTracking = async (orderId) => {
  return api.get(`/orders/${orderId}/tracking`);
};

// ============================================
// Address API Services
// ============================================

/**
 * Get user's saved addresses
 * @returns {Promise<Array>} List of addresses
 */
export const getAddresses = async () => {
  return api.get('/addresses');
};

/**
 * Add new address
 * @param {Object} addressData - Address data
 * @returns {Promise<Object>} Created address
 */
export const addAddress = async (addressData) => {
  return api.post('/addresses', addressData);
};

/**
 * Update address
 * @param {string} addressId - Address ID
 * @param {Object} addressData - Updated address data
 * @returns {Promise<Object>} Updated address
 */
export const updateAddress = async (addressId, addressData) => {
  return api.put(`/addresses/${addressId}`, addressData);
};

/**
 * Delete address
 * @param {string} addressId - Address ID
 * @returns {Promise<Object>} Success message
 */
export const deleteAddress = async (addressId) => {
  return api.delete(`/addresses/${addressId}`);
};

/**
 * Set default address
 * @param {string} addressId - Address ID
 * @returns {Promise<Object>} Updated address
 */
export const setDefaultAddress = async (addressId) => {
  return api.put(`/addresses/${addressId}/default`);
};

// ============================================
// Heritage Content API Services
// ============================================

/**
 * Get all heritage content
 * @param {string} language - Language code ('zh', 'en', 'ja')
 * @returns {Promise<Array>} Heritage content list
 */
export const getHeritageContent = async (language = 'zh') => {
  return api.get('/heritage', { params: { lang: language } });
};

/**
 * Get heritage content by type
 * @param {string} heritageType - Heritage type
 * @param {string} language - Language code
 * @returns {Promise<Object>} Heritage content details
 */
export const getHeritageByType = async (heritageType, language = 'zh') => {
  return api.get(`/heritage/${heritageType}`, { params: { lang: language } });
};
