import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showSuccess, showError, showWarning, showInfo } from '../store/slices/toastSlice';
import { getErrorMessage } from '../utils/errorHandler';

/**
 * Custom hook for showing toast notifications
 * Provides convenient methods for displaying different types of toasts
 * 
 * @returns {Object} Toast methods
 */
export const useToast = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return {
    /**
     * Show success toast
     * @param {string} message - Success message (can be translation key)
     * @param {string} title - Optional title
     * @param {number} duration - Optional duration in ms
     */
    success: (message, title = null, duration = 5000) => {
      dispatch(showSuccess(message, title, duration));
    },

    /**
     * Show error toast
     * @param {string|Object} error - Error message or error object
     * @param {string} title - Optional title
     * @param {number} duration - Optional duration in ms
     */
    error: (error, title = null, duration = 7000) => {
      const message = typeof error === 'string' 
        ? error 
        : getErrorMessage(error, t);
      dispatch(showError(message, title, duration));
    },

    /**
     * Show warning toast
     * @param {string} message - Warning message
     * @param {string} title - Optional title
     * @param {number} duration - Optional duration in ms
     */
    warning: (message, title = null, duration = 6000) => {
      dispatch(showWarning(message, title, duration));
    },

    /**
     * Show info toast
     * @param {string} message - Info message
     * @param {string} title - Optional title
     * @param {number} duration - Optional duration in ms
     */
    info: (message, title = null, duration = 5000) => {
      dispatch(showInfo(message, title, duration));
    },
  };
};

export default useToast;
