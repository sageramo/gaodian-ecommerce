/**
 * User data model and validation
 */

import { validateAddress } from './Order.js';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid (at least 8 characters)
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 8;
};

/**
 * Validate user data
 * @param {Object} user - User object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateUser = (user) => {
  const errors = [];

  if (!user) {
    return { valid: false, errors: ['User is required'] };
  }

  if (!user.id || typeof user.id !== 'string') {
    errors.push('User ID is required and must be a string');
  }

  if (!isValidEmail(user.email)) {
    errors.push('Valid email is required');
  }

  if (!user.name || typeof user.name !== 'string') {
    errors.push('User name is required and must be a string');
  }

  if (user.phone && typeof user.phone !== 'string') {
    errors.push('Phone must be a string if provided');
  }

  if (!Array.isArray(user.addresses)) {
    errors.push('User addresses must be an array');
  } else {
    user.addresses.forEach((address, index) => {
      const addressValidation = validateAddress(address);
      if (!addressValidation.valid) {
        errors.push(`Address ${index}: ${addressValidation.errors.join(', ')}`);
      }
    });
  }

  const validLanguages = ['zh', 'en', 'ja'];
  if (!validLanguages.includes(user.preferredLanguage)) {
    errors.push('Preferred language must be one of: zh, en, ja');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create a default user object
 * @param {Object} overrides - Properties to override
 * @returns {Object} User object
 */
export const createUser = (overrides = {}) => {
  return {
    id: '',
    email: '',
    name: '',
    phone: '',
    addresses: [],
    preferredLanguage: 'zh',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
};
