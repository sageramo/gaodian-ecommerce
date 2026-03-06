/**
 * CartItem data model and validation
 */

/**
 * Validate cart item data
 * @param {Object} item - Cart item object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateCartItem = (item) => {
  const errors = [];

  if (!item) {
    return { valid: false, errors: ['Cart item is required'] };
  }

  if (!item.productId || typeof item.productId !== 'string') {
    errors.push('Product ID is required and must be a string');
  }

  if (!item.name || typeof item.name !== 'string') {
    errors.push('Product name is required and must be a string');
  }

  if (typeof item.price !== 'number' || item.price < 0) {
    errors.push('Price is required and must be a non-negative number');
  }

  if (typeof item.quantity !== 'number' || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
    errors.push('Quantity is required and must be a positive integer');
  }

  if (!item.image || typeof item.image !== 'string') {
    errors.push('Product image is required and must be a string');
  }

  if (!item.addedAt || typeof item.addedAt !== 'string') {
    errors.push('Added timestamp is required and must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create a cart item object
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity to add
 * @returns {Object} Cart item object
 */
export const createCartItem = (product, quantity = 1) => {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
    image: product.images[0] || '',
    addedAt: new Date().toISOString(),
  };
};

/**
 * Calculate subtotal for a cart item
 * @param {Object} item - Cart item
 * @returns {number} Subtotal
 */
export const calculateItemSubtotal = (item) => {
  return item.price * item.quantity;
};
