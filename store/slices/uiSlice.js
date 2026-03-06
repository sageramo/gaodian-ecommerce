import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || 'zh',
  theme: 'light',
  isMobile: window.innerWidth < 768,
  isLoading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Set language
     * @param {Object} action.payload - language code ('zh', 'en', 'ja')
     */
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },

    /**
     * Set theme
     * @param {Object} action.payload - theme ('light', 'dark')
     */
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    /**
     * Set mobile state
     * @param {Object} action.payload - boolean
     */
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },

    /**
     * Set global loading state
     * @param {Object} action.payload - boolean
     */
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    /**
     * Show notification
     * @param {Object} action.payload - { type: 'success'|'error'|'warning'|'info', message: string }
     */
    showNotification: (state, action) => {
      state.notification = {
        ...action.payload,
        id: Date.now(),
      };
    },

    /**
     * Hide notification
     */
    hideNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  setLanguage,
  setTheme,
  setIsMobile,
  setIsLoading,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
