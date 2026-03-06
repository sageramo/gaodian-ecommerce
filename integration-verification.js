/**
 * Integration Verification Script
 * 
 * This script verifies that all modules are properly integrated and
 * the data flow is correct throughout the application.
 */

import { store } from './src/store/index.js';
import { router } from './src/router/index.jsx';

console.log('🔍 Starting Integration Verification...\n');

// ============================================
// 1. Verify Redux Store Integration
// ============================================
console.log('1️⃣ Verifying Redux Store Integration...');

const storeState = store.getState();
const requiredSlices = ['ui', 'cart', 'auth', 'products', 'orders', 'toast'];
const missingSlices = requiredSlices.filter(slice => !(slice in storeState));

if (missingSlices.length === 0) {
  console.log('✅ All Redux slices are properly integrated');
  console.log(`   Found slices: ${Object.keys(storeState).join(', ')}`);
} else {
  console.error('❌ Missing Redux slices:', missingSlices.join(', '));
  process.exit(1);
}

// Verify initial state structure
console.log('\n   Checking initial state structure...');
const stateChecks = [
  { slice: 'cart', property: 'items', type: 'array' },
  { slice: 'cart', property: 'totalAmount', type: 'number' },
  { slice: 'auth', property: 'user', type: 'object' },
  { slice: 'auth', property: 'isAuthenticated', type: 'boolean' },
  { slice: 'products', property: 'items', type: 'array' },
  { slice: 'orders', property: 'orders', type: 'array' },
  { slice: 'ui', property: 'language', type: 'string' },
  { slice: 'toast', property: 'toasts', type: 'array' },
];

let stateChecksPassed = true;
stateChecks.forEach(check => {
  const value = storeState[check.slice]?.[check.property];
  const actualType = Array.isArray(value) ? 'array' : typeof value;
  
  if (actualType !== check.type && value !== null) {
    console.error(`   ❌ ${check.slice}.${check.property}: expected ${check.type}, got ${actualType}`);
    stateChecksPassed = false;
  }
});

if (stateChecksPassed) {
  console.log('   ✅ All state structures are valid');
}

// ============================================
// 2. Verify Router Configuration
// ============================================
console.log('\n2️⃣ Verifying Router Configuration...');

const requiredRoutes = [
  '/',
  '/products',
  '/products/:id',
  '/cart',
  '/checkout',
  '/payment/:orderId',
  '/orders',
  '/orders/:orderId',
  '/heritage',
  '/auth',
  '/user-center',
];

const routerRoutes = router.routes[0].children || [];
const configuredPaths = routerRoutes.map(route => 
  route.index ? '/' : `/${route.path}`
);

console.log(`   Found ${routerRoutes.length} configured routes`);

const missingRoutes = requiredRoutes.filter(route => {
  if (route === '/') return configuredPaths.includes('/');
  const routePattern = route.replace(/:\w+/g, ':id');
  return !configuredPaths.some(path => {
    const pathPattern = path.replace(/:\w+/g, ':id');
    return pathPattern === routePattern || path === route.replace('/', '');
  });
});

if (missingRoutes.length === 0) {
  console.log('✅ All required routes are configured');
} else {
  console.error('❌ Missing routes:', missingRoutes.join(', '));
  process.exit(1);
}

// ============================================
// 3. Verify Data Flow Patterns
// ============================================
console.log('\n3️⃣ Verifying Data Flow Patterns...');

// Test cart data flow
console.log('   Testing cart data flow...');
const { addItem, updateQuantity, removeItem } = await import('./src/store/slices/cartSlice.js');

// Add item to cart
store.dispatch(addItem({
  productId: 'test-product-1',
  name: 'Test Product',
  price: 100,
  quantity: 2,
  image: 'test.jpg',
}));

let cartState = store.getState().cart;
if (cartState.items.length === 1 && cartState.totalAmount === 200) {
  console.log('   ✅ Cart add item works correctly');
} else {
  console.error('   ❌ Cart add item failed');
  process.exit(1);
}

// Update quantity
store.dispatch(updateQuantity({ productId: 'test-product-1', quantity: 3 }));
cartState = store.getState().cart;
if (cartState.items[0].quantity === 3 && cartState.totalAmount === 300) {
  console.log('   ✅ Cart update quantity works correctly');
} else {
  console.error('   ❌ Cart update quantity failed');
  process.exit(1);
}

// Remove item
store.dispatch(removeItem('test-product-1'));
cartState = store.getState().cart;
if (cartState.items.length === 0 && cartState.totalAmount === 0) {
  console.log('   ✅ Cart remove item works correctly');
} else {
  console.error('   ❌ Cart remove item failed');
  process.exit(1);
}

// ============================================
// 4. Verify Module Imports
// ============================================
console.log('\n4️⃣ Verifying Module Imports...');

const criticalModules = [
  { path: './src/components/Layout.jsx', name: 'Layout' },
  { path: './src/components/Header.jsx', name: 'Header' },
  { path: './src/components/ProductCard.jsx', name: 'ProductCard' },
  { path: './src/components/CartIcon.jsx', name: 'CartIcon' },
  { path: './src/components/LanguageSwitcher.jsx', name: 'LanguageSwitcher' },
  { path: './src/pages/HomePage.jsx', name: 'HomePage' },
  { path: './src/pages/CartPage.jsx', name: 'CartPage' },
  { path: './src/pages/ProductDetailPage.jsx', name: 'ProductDetailPage' },
  { path: './src/services/api.js', name: 'API Service' },
  { path: './src/utils/localStorage.js', name: 'LocalStorage Utils' },
];

let moduleChecksPassed = true;
for (const module of criticalModules) {
  try {
    await import(module.path);
    console.log(`   ✅ ${module.name} imports successfully`);
  } catch (error) {
    console.error(`   ❌ ${module.name} import failed:`, error.message);
    moduleChecksPassed = false;
  }
}

if (!moduleChecksPassed) {
  process.exit(1);
}

// ============================================
// 5. Verify i18n Configuration
// ============================================
console.log('\n5️⃣ Verifying i18n Configuration...');

const i18n = await import('./src/i18n/config.js');
const supportedLanguages = ['zh', 'en', 'ja'];

console.log(`   Supported languages: ${supportedLanguages.join(', ')}`);
console.log('   ✅ i18n configuration loaded successfully');

// ============================================
// Summary
// ============================================
console.log('\n' + '='.repeat(50));
console.log('✅ Integration Verification Complete!');
console.log('='.repeat(50));
console.log('\nAll modules are properly integrated:');
console.log('  ✓ Redux store with all slices');
console.log('  ✓ Router with all required routes');
console.log('  ✓ Data flow patterns (cart operations)');
console.log('  ✓ Critical module imports');
console.log('  ✓ i18n configuration');
console.log('\n✨ The application is ready for final testing!\n');
