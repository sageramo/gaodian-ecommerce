/**
 * Redux selectors for accessing state
 * Using Reselect for memoized selectors to optimize performance
 */
import { createSelector } from 'reselect';

// UI Selectors
export const selectLanguage = (state) => state.ui.language;
export const selectTheme = (state) => state.ui.theme;
export const selectIsMobile = (state) => state.ui.isMobile;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectNotification = (state) => state.ui.notification;

// Auth Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Memoized selector for user addresses
export const selectUserAddresses = createSelector(
  [selectUser],
  (user) => user?.addresses || []
);

// Memoized selector for default address
export const selectDefaultAddress = createSelector(
  [selectUserAddresses],
  (addresses) => addresses.find((addr) => addr.isDefault) || null
);

// Cart Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartTotalItems = (state) => state.cart.totalItems;

// Memoized selector for cart item count
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

// Memoized selector for empty cart check
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

// Products Selectors
export const selectProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectProductFilters = (state) => state.products.filters;

/**
 * Memoized selector for filtered products
 * Only recalculates when products or filters change
 */
export const selectFilteredProducts = createSelector(
  [selectProducts, selectProductFilters],
  (items, filters) => {
    const { category, priceRange, inStockOnly, searchKeyword } = filters;

    return items.filter((product) => {
      // Category filter (产品分类过滤)
      if (category && product.category !== category) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }

      // In stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Search keyword filter
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        
        // Handle multi-language name object
        let nameZh = '';
        let nameEn = '';
        let nameJa = '';
        
        if (product.name && typeof product.name === 'object') {
          nameZh = product.name.zh?.toLowerCase() || '';
          nameEn = product.name.en?.toLowerCase() || '';
          nameJa = product.name.ja?.toLowerCase() || '';
        } else if (typeof product.name === 'string') {
          nameZh = product.name.toLowerCase();
        }
        
        // Handle legacy format
        if (product.nameEn) nameEn = product.nameEn.toLowerCase();
        if (product.nameJa) nameJa = product.nameJa.toLowerCase();
        
        // Handle description
        let descriptionText = '';
        if (product.description && typeof product.description === 'object') {
          descriptionText = (product.description.zh || product.description.en || '').toLowerCase();
        } else if (typeof product.description === 'string') {
          descriptionText = product.description.toLowerCase();
        }
        
        const nameMatch = nameZh.includes(keyword) || nameEn.includes(keyword) || nameJa.includes(keyword);
        const descMatch = descriptionText.includes(keyword);

        if (!nameMatch && !descMatch) {
          return false;
        }
      }

      return true;
    });
  }
);

/**
 * Memoized selector factory for products by heritage type
 * Creates a new memoized selector for each heritage type
 */
export const makeSelectProductsByHeritageType = () =>
  createSelector(
    [selectProducts, (state, heritageType) => heritageType],
    (products, heritageType) =>
      products.filter((product) => product.heritageType === heritageType)
  );

/**
 * Memoized selector for products grouped by heritage type
 * Useful for category displays
 */
export const selectProductsByCategory = createSelector(
  [selectProducts],
  (products) => {
    const grouped = {};
    products.forEach((product) => {
      if (!grouped[product.heritageType]) {
        grouped[product.heritageType] = [];
      }
      grouped[product.heritageType].push(product);
    });
    return grouped;
  }
);

/**
 * Memoized selector for in-stock products count
 */
export const selectInStockProductsCount = createSelector(
  [selectProducts],
  (products) => products.filter((p) => p.stock > 0).length
);

// Orders Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

/**
 * Memoized selector factory for orders by status
 */
export const makeSelectOrdersByStatus = () =>
  createSelector(
    [selectOrders, (state, status) => status],
    (orders, status) => orders.filter((order) => order.status === status)
  );

/**
 * Memoized selector for pending orders
 */
export const selectPendingOrders = createSelector(
  [selectOrders],
  (orders) => orders.filter((order) => order.status === 'pending')
);

/**
 * Memoized selector for completed orders
 */
export const selectCompletedOrders = createSelector(
  [selectOrders],
  (orders) => orders.filter((order) => order.status === 'delivered')
);

/**
 * Memoized selector for total order value
 */
export const selectTotalOrderValue = createSelector(
  [selectOrders],
  (orders) =>
    orders.reduce((total, order) => {
      if (order.status !== 'cancelled') {
        return total + order.totalAmount;
      }
      return total;
    }, 0)
);