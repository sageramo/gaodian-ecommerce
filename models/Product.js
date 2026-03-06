/**
 * Product data model and validation
 */

/**
 * Heritage types for products
 */
export const HeritageType = {
  MAHJONG: 'mahjong',
  GO: 'go',
  CHESS: 'chess',
  DOMINOES: 'dominoes',
  OTHER: 'other',
};

/**
 * Validate if a value is a valid heritage type
 * @param {string} type - Heritage type to validate
 * @returns {boolean} True if valid
 */
export const isValidHeritageType = (type) => {
  return Object.values(HeritageType).includes(type);
};

/**
 * Validate product data
 * @param {Object} product - Product object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateProduct = (product) => {
  const errors = [];

  if (!product) {
    return { valid: false, errors: ['Product is required'] };
  }

  // Required fields
  if (!product.id || typeof product.id !== 'string') {
    errors.push('Product ID is required and must be a string');
  }

  if (!product.name || typeof product.name !== 'string') {
    errors.push('Product name is required and must be a string');
  }

  if (typeof product.price !== 'number' || product.price < 0) {
    errors.push('Product price is required and must be a non-negative number');
  }

  if (!product.currency || typeof product.currency !== 'string') {
    errors.push('Product currency is required and must be a string');
  }

  if (!Array.isArray(product.images) || product.images.length === 0) {
    errors.push('Product must have at least one image');
  }

  if (!isValidHeritageType(product.heritageType)) {
    errors.push('Product heritage type must be valid');
  }

  if (typeof product.stock !== 'number' || product.stock < 0) {
    errors.push('Product stock is required and must be a non-negative number');
  }

  // Optional but validated if present
  if (product.specifications) {
    if (typeof product.specifications !== 'object') {
      errors.push('Product specifications must be an object');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create a default product object
 * @param {Object} overrides - Properties to override
 * @returns {Object} Product object
 */
export const createProduct = (overrides = {}) => {
  return {
    id: '',
    name: '',
    nameEn: '',
    nameJa: '',
    description: '',
    descriptionEn: '',
    descriptionJa: '',
    price: 0,
    currency: 'CNY',
    images: [],
    heritageType: HeritageType.OTHER,
    heritageStory: '',
    heritageStoryEn: '',
    heritageStoryJa: '',
    stock: 0,
    specifications: {
      weight: '',
      ingredients: '',
      shelfLife: '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
};
