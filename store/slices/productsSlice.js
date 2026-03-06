import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentProduct: null,
  filters: {
    heritageType: null,
    priceRange: { min: 0, max: Infinity },
    inStockOnly: false,
    searchKeyword: '',
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
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
     * Set products list
     * @param {Object} action.payload - array of products
     */
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Set current product (for detail page)
     * @param {Object} action.payload - product object
     */
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Clear current product
     */
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },

    /**
     * Set heritage type filter
     * @param {Object} action.payload - heritage type or null
     */
    setHeritageTypeFilter: (state, action) => {
      state.filters.heritageType = action.payload;
    },

    /**
     * Set price range filter
     * @param {Object} action.payload - { min, max }
     */
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload;
    },

    /**
     * Set in stock only filter
     * @param {Object} action.payload - boolean
     */
    setInStockOnlyFilter: (state, action) => {
      state.filters.inStockOnly = action.payload;
    },

    /**
     * Set search keyword
     * @param {Object} action.payload - search keyword string
     */
    setSearchKeyword: (state, action) => {
      state.filters.searchKeyword = action.payload;
    },

    /**
     * Clear all filters
     */
    clearFilters: (state) => {
      state.filters = {
        heritageType: null,
        priceRange: { min: 0, max: Infinity },
        inStockOnly: false,
        searchKeyword: '',
      };
    },

    /**
     * Update product stock (after purchase)
     * @param {Object} action.payload - { productId, stock }
     */
    updateProductStock: (state, action) => {
      const { productId, stock } = action.payload;
      const product = state.items.find((p) => p.id === productId);
      if (product) {
        product.stock = stock;
      }
      if (state.currentProduct && state.currentProduct.id === productId) {
        state.currentProduct.stock = stock;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setCurrentProduct,
  clearCurrentProduct,
  setHeritageTypeFilter,
  setPriceRangeFilter,
  setInStockOnlyFilter,
  setSearchKeyword,
  clearFilters,
  updateProductStock,
} = productsSlice.actions;

export default productsSlice.reducer;
