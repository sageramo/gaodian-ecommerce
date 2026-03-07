/**
 * Error Handler Utilities
 * Provides centralized error handling and user-friendly error messages
 */

/**
 * Get user-friendly error message based on error type
 * @param {Object} error - Error object from API or other sources
 * @param {Function} t - Translation function from i18next
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error, t) => {
  // Handle network errors
  if (!error) {
    return t('error.unknownError');
  }

  // Handle API errors with status codes
  if (error.status !== undefined) {
    switch (error.status) {
      case 0:
        return t('error.networkError');
      case 400:
        return error.message || t('error.badRequest');
      case 401:
        return t('error.unauthorized');
      case 403:
        return t('error.forbidden');
      case 404:
        return t('error.notFound');
      case 422:
        return error.message || t('error.validationError');
      case 500:
        return t('error.serverError');
      case 503:
        return t('error.serviceUnavailable');
      default:
        return error.message || t('error.unknownError');
    }
  }

  // Handle validation errors with field-specific messages
  if (error.errors && typeof error.errors === 'object') {
    const firstError = Object.values(error.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle Error objects
  if (error.message) {
    return error.message;
  }

  return t('error.unknownError');
};

/**
 * Handle form validation errors
 * @param {Object} error - Error object with validation errors
 * @returns {Object} Field-specific error messages
 */
export const getValidationErrors = (error) => {
  if (error.errors && typeof error.errors === 'object') {
    const fieldErrors = {};
    Object.keys(error.errors).forEach((field) => {
      const errorMessages = error.errors[field];
      fieldErrors[field] = Array.isArray(errorMessages)
        ? errorMessages[0]
        : errorMessages;
    });
    return fieldErrors;
  }
  return {};
};

/**
 * Check if error is a network error
 * @param {Object} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return error && error.status === 0;
};

/**
 * Check if error is an authentication error
 * @param {Object} error - Error object
 * @returns {boolean} True if auth error
 */
export const isAuthError = (error) => {
  return error && (error.status === 401 || error.status === 403);
};

/**
 * Check if error is a validation error
 * @param {Object} error - Error object
 * @returns {boolean} True if validation error
 */
export const isValidationError = (error) => {
  return error && (error.status === 422 || (error.errors && typeof error.errors === 'object'));
};

/**
 * Log error to console in development mode
 * In production, this could send errors to a monitoring service
 * @param {string} context - Context where error occurred
 * @param {Object} error - Error object
 */
export const logError = (context, error) => {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error?.message || error?.toString() || String(error));
  }
  
  // In production, send to error monitoring service
  // Example: Sentry.captureException(error, { tags: { context } });
};

/**
 * Handle async errors with try-catch wrapper
 * @param {Function} asyncFn - Async function to execute
 * @param {Function} onError - Error handler callback
 * @returns {Function} Wrapped async function
 */
export const withErrorHandler = (asyncFn, onError) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  };
};

/**
 * Retry failed async operations
 * @param {Function} asyncFn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Result of async function
 */
export const retryAsync = async (asyncFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on auth or validation errors
      if (isAuthError(error) || isValidationError(error)) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

/**
 * Create error object with consistent structure
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @param {Object} errors - Field-specific errors
 * @returns {Object} Structured error object
 */
export const createError = (status, message, errors = null) => {
  return {
    status,
    message,
    errors,
  };
};
