/**
 * Order data model and validation
 */

/**
 * Order status types
 */
export const OrderStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

/**
 * Payment status types
 */
export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

/**
 * Validate if a value is a valid order status
 * @param {string} status - Order status to validate
 * @returns {boolean} True if valid
 */
export const isValidOrderStatus = (status) => {
  return Object.values(OrderStatus).includes(status);
};

/**
 * Validate if a value is a valid payment status
 * @param {string} status - Payment status to validate
 * @returns {boolean} True if valid
 */
export const isValidPaymentStatus = (status) => {
  return Object.values(PaymentStatus).includes(status);
};

/**
 * Validate order item data
 * @param {Object} item - Order item object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateOrderItem = (item) => {
  const errors = [];

  if (!item) {
    return { valid: false, errors: ['Order item is required'] };
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

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate address data
 * @param {Object} address - Address object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateAddress = (address) => {
  const errors = [];

  if (!address) {
    return { valid: false, errors: ['Address is required'] };
  }

  const requiredFields = [
    'recipientName',
    'phone',
    'country',
    'province',
    'city',
    'district',
    'street',
    'postalCode',
  ];

  requiredFields.forEach((field) => {
    if (!address[field] || typeof address[field] !== 'string') {
      errors.push(`Address ${field} is required and must be a string`);
    }
  });

  if (typeof address.isDefault !== 'boolean') {
    errors.push('Address isDefault must be a boolean');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate order data
 * @param {Object} order - Order object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateOrder = (order) => {
  const errors = [];

  if (!order) {
    return { valid: false, errors: ['Order is required'] };
  }

  if (!order.id || typeof order.id !== 'string') {
    errors.push('Order ID is required and must be a string');
  }

  if (!order.userId || typeof order.userId !== 'string') {
    errors.push('User ID is required and must be a string');
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    errors.push('Order must have at least one item');
  } else {
    order.items.forEach((item, index) => {
      const itemValidation = validateOrderItem(item);
      if (!itemValidation.valid) {
        errors.push(`Order item ${index}: ${itemValidation.errors.join(', ')}`);
      }
    });
  }

  if (typeof order.totalAmount !== 'number' || order.totalAmount < 0) {
    errors.push('Total amount is required and must be a non-negative number');
  }

  if (!order.currency || typeof order.currency !== 'string') {
    errors.push('Currency is required and must be a string');
  }

  if (!isValidOrderStatus(order.status)) {
    errors.push('Order status must be valid');
  }

  if (!isValidPaymentStatus(order.paymentStatus)) {
    errors.push('Payment status must be valid');
  }

  const addressValidation = validateAddress(order.shippingAddress);
  if (!addressValidation.valid) {
    errors.push(`Shipping address: ${addressValidation.errors.join(', ')}`);
  }

  if (!order.paymentMethod || typeof order.paymentMethod !== 'string') {
    errors.push('Payment method is required and must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create a default address object
 * @param {Object} overrides - Properties to override
 * @returns {Object} Address object
 */
export const createAddress = (overrides = {}) => {
  return {
    id: '',
    recipientName: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    district: '',
    street: '',
    postalCode: '',
    isDefault: false,
    ...overrides,
  };
};

/**
 * Create an order item from a cart item
 * @param {Object} cartItem - Cart item object
 * @returns {Object} Order item object
 */
export const createOrderItem = (cartItem) => {
  return {
    productId: cartItem.productId,
    name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.quantity,
    image: cartItem.image,
  };
};

/**
 * Generate a unique order ID
 * @returns {string} Order ID
 */
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `ORD${timestamp}${random}`;
};

/**
 * Create a default order object
 * @param {Object} overrides - Properties to override
 * @returns {Object} Order object
 */
export const createOrder = (overrides = {}) => {
  return {
    id: generateOrderId(),
    userId: '',
    items: [],
    totalAmount: 0,
    currency: 'CNY',
    status: OrderStatus.PENDING,
    shippingAddress: createAddress(),
    paymentMethod: '',
    paymentStatus: PaymentStatus.PENDING,
    trackingNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
};
