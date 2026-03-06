# API Services Documentation

This directory contains the API service layer for the Gaodian Qingbaoju E-commerce platform.

## Files

- **api.js**: Core Axios instance with interceptors and all API service functions
- **apiWithLoading.js**: Wrapped API services with automatic loading state management
- **README.md**: This documentation file

## Usage

### Basic API Calls (Without Loading Indicator)

Import directly from `api.js` when you want manual control over loading states:

```javascript
import { getProducts, loginUser, createOrder } from '../services/api';

// Fetch products
const products = await getProducts({ category: 'mahjong' });

// Login user
const { user, token } = await loginUser({ email, password });

// Create order
const order = await createOrder(orderData);
```

### API Calls with Automatic Loading Indicator

Import from `apiWithLoading.js` to automatically show/hide the global loading indicator:

```javascript
import { getProducts, loginUser, createOrder } from '../services/apiWithLoading';

// These calls will automatically show/hide the loading indicator
const products = await getProducts({ category: 'mahjong' });
const { user, token } = await loginUser({ email, password });
const order = await createOrder(orderData);
```

### Using in React Components

```javascript
import { useEffect, useState } from 'react';
import { getProducts } from '../services/apiWithLoading';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Loading indicator will show automatically
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
      // Loading indicator will hide automatically
    };

    fetchProducts();
  }, []);

  if (error) return <div>Error: {error}</div>;
  return <div>{/* Render products */}</div>;
}
```

### Using in Redux Thunks

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../services/apiWithLoading';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const products = await getProducts(filters);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## Available API Services

### Product APIs

- `getProducts(params)` - Get all products with optional filters
- `getProductById(productId)` - Get product details by ID
- `searchProducts(keyword, language)` - Search products by keyword
- `getProductsByHeritageType(heritageType)` - Get products by heritage type

### User APIs

- `registerUser(userData)` - Register new user
- `loginUser(credentials)` - Login user
- `getUserProfile()` - Get current user profile
- `updateUserProfile(userData)` - Update user profile
- `requestPasswordReset(email)` - Request password reset
- `resetPassword(data)` - Reset password with token
- `logoutUser()` - Logout user

### Cart APIs

- `getCart()` - Get user's cart from server
- `syncCart(cartItems)` - Sync local cart to server
- `addToCart(item)` - Add item to cart
- `updateCartItem(productId, quantity)` - Update cart item quantity
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Clear entire cart

### Order APIs

- `createOrder(orderData)` - Create new order
- `getOrders(params)` - Get all orders for current user
- `getOrderById(orderId)` - Get order details by ID
- `updateOrderStatus(orderId, status)` - Update order status
- `cancelOrder(orderId)` - Cancel order
- `processPayment(orderId, paymentData)` - Process payment for order
- `getOrderTracking(orderId)` - Get order tracking information

### Address APIs

- `getAddresses()` - Get user's saved addresses
- `addAddress(addressData)` - Add new address
- `updateAddress(addressId, addressData)` - Update address
- `deleteAddress(addressId)` - Delete address
- `setDefaultAddress(addressId)` - Set default address

### Heritage Content APIs

- `getHeritageContent(language)` - Get all heritage content
- `getHeritageByType(heritageType, language)` - Get heritage content by type

## Error Handling

All API calls return structured errors:

```javascript
try {
  const data = await getProducts();
} catch (error) {
  console.log(error.status);   // HTTP status code (0 for network errors)
  console.log(error.message);  // Error message
  console.log(error.errors);   // Validation errors (if any)
}
```

## Authentication

The API automatically includes the authentication token from localStorage in all requests. When a 401 (Unauthorized) response is received, the user is automatically redirected to the login page.

## Configuration

Set the API base URL in your `.env` file:

```
VITE_API_BASE_URL=https://api.example.com/api
```

If not set, it defaults to `http://localhost:3000/api`.

## Loading State Management

The global loading indicator is controlled by the `ui.isLoading` state in Redux. When using `apiWithLoading.js`, this state is automatically managed. The `LoadingIndicator` component displays a spinner overlay when `isLoading` is true.

### Customizing Loading Behavior

Some operations (like cart updates) don't show the global loading indicator by default. To customize this:

```javascript
import { withLoading } from '../services/apiWithLoading';
import { myApiFunction } from '../services/api';

// Create a wrapped version with custom loading behavior
const myApiWithLoading = withLoading(myApiFunction, true); // true = show loading
const myApiSilent = withLoading(myApiFunction, false); // false = no loading indicator
```

## Best Practices

1. **Use apiWithLoading for user-initiated actions** (button clicks, form submissions)
2. **Use api.js for background operations** (polling, silent updates)
3. **Always handle errors** with try-catch blocks
4. **Use Redux thunks** for complex state management scenarios
5. **Keep API calls in service layer** - don't make direct axios calls in components
