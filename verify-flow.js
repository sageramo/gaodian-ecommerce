/**
 * Complete Shopping Flow Verification Script
 * 
 * This script verifies the core functionality of the e-commerce platform
 * by checking that all essential files and components are in place.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

// Files to check for each feature
const requiredFiles = {
  'Project Setup': [
    'package.json',
    'vite.config.js',
    'index.html',
    'src/main.jsx',
    'src/App.jsx',
  ],
  'Internationalization': [
    'src/i18n/config.js',
    'src/i18n/locales/zh.json',
    'src/i18n/locales/en.json',
    'src/i18n/locales/ja.json',
    'src/components/LanguageSwitcher.jsx',
  ],
  'Layout & Navigation': [
    'src/components/Layout.jsx',
    'src/components/Header.jsx',
    'src/router/index.jsx',
  ],
  'Data Models': [
    'src/models/Product.js',
    'src/models/CartItem.js',
    'src/models/Order.js',
    'src/models/User.js',
  ],
  'Redux Store': [
    'src/store/store.js',
    'src/store/slices/productsSlice.js',
    'src/store/slices/cartSlice.js',
    'src/store/slices/authSlice.js',
    'src/store/slices/ordersSlice.js',
    'src/store/slices/uiSlice.js',
  ],
  'Local Storage': [
    'src/utils/localStorage.js',
    'src/store/initializeStore.js',
  ],
  'Product Display': [
    'src/pages/HomePage.jsx',
    'src/pages/ProductListPage.jsx',
    'src/pages/ProductDetailPage.jsx',
    'src/components/ProductCard.jsx',
    'src/components/ProductGrid.jsx',
    'src/components/ImageGallery.jsx',
  ],
  'Shopping Cart': [
    'src/pages/CartPage.jsx',
    'src/components/CartItem.jsx',
    'src/components/AddToCartButton.jsx',
    'src/components/CartIcon.jsx',
  ],
  'Search & Filter': [
    'src/components/SearchBar.jsx',
    'src/components/FilterSidebar.jsx',
  ],
  'User Authentication': [
    'src/pages/AuthPage.jsx',
    'src/components/LoginForm.jsx',
    'src/components/RegisterForm.jsx',
  ],
  'User Center': [
    'src/pages/UserCenterPage.jsx',
    'src/components/UserMenu.jsx',
  ],
  'Order Processing': [
    'src/pages/CheckoutPage.jsx',
    'src/pages/PaymentPage.jsx',
    'src/pages/OrderPage.jsx',
  ],
  'Services': [
    'src/services/api.js',
  ],
};

// Check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(path.join(__dirname, filePath));
  } catch (error) {
    return false;
  }
}

// Check if a file contains specific content
function fileContains(filePath, searchString) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return content.includes(searchString);
  } catch (error) {
    return false;
  }
}

// Verify all required files
function verifyFiles() {
  log.section('📁 Verifying File Structure');
  
  let totalFiles = 0;
  let existingFiles = 0;
  let missingFiles = [];

  for (const [category, files] of Object.entries(requiredFiles)) {
    console.log(`\n${category}:`);
    
    for (const file of files) {
      totalFiles++;
      if (fileExists(file)) {
        existingFiles++;
        log.success(file);
      } else {
        missingFiles.push(file);
        log.error(`${file} (missing)`);
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total: ${existingFiles}/${totalFiles} files found`);
  
  if (missingFiles.length > 0) {
    log.warning(`\nMissing files (${missingFiles.length}):`);
    missingFiles.forEach(file => console.log(`  - ${file}`));
  }

  return { totalFiles, existingFiles, missingFiles };
}

// Verify Redux store configuration
function verifyReduxStore() {
  log.section('🔄 Verifying Redux Store');

  const checks = [
    {
      name: 'Store configuration',
      file: 'src/store/store.js',
      content: 'configureStore',
    },
    {
      name: 'Products slice',
      file: 'src/store/slices/productsSlice.js',
      content: 'createSlice',
    },
    {
      name: 'Cart slice',
      file: 'src/store/slices/cartSlice.js',
      content: 'addToCart',
    },
    {
      name: 'Auth slice',
      file: 'src/store/slices/authSlice.js',
      content: 'loginSuccess',
    },
    {
      name: 'Orders slice',
      file: 'src/store/slices/ordersSlice.js',
      content: 'createOrder',
    },
  ];

  let passed = 0;
  checks.forEach(check => {
    if (fileExists(check.file) && fileContains(check.file, check.content)) {
      log.success(check.name);
      passed++;
    } else {
      log.error(check.name);
    }
  });

  return { total: checks.length, passed };
}

// Verify routing configuration
function verifyRouting() {
  log.section('🛣️  Verifying Routing');

  const routes = [
    { name: 'Home', path: 'HomePage' },
    { name: 'Product List', path: 'ProductListPage' },
    { name: 'Product Detail', path: 'ProductDetailPage' },
    { name: 'Cart', path: 'CartPage' },
    { name: 'Checkout', path: 'CheckoutPage' },
    { name: 'Payment', path: 'PaymentPage' },
    { name: 'Orders', path: 'OrderPage' },
    { name: 'Auth', path: 'AuthPage' },
    { name: 'User Center', path: 'UserCenterPage' },
  ];

  let passed = 0;
  const routerFile = 'src/router/index.jsx';

  if (fileExists(routerFile)) {
    routes.forEach(route => {
      if (fileContains(routerFile, route.path)) {
        log.success(`${route.name} route`);
        passed++;
      } else {
        log.error(`${route.name} route`);
      }
    });
  } else {
    log.error('Router file not found');
  }

  return { total: routes.length, passed };
}

// Verify i18n configuration
function verifyI18n() {
  log.section('🌐 Verifying Internationalization');

  const checks = [
    { name: 'i18n config', file: 'src/i18n/config.js' },
    { name: 'Chinese translations', file: 'src/i18n/locales/zh.json' },
    { name: 'English translations', file: 'src/i18n/locales/en.json' },
    { name: 'Japanese translations', file: 'src/i18n/locales/ja.json' },
    { name: 'Language switcher', file: 'src/components/LanguageSwitcher.jsx' },
  ];

  let passed = 0;
  checks.forEach(check => {
    if (fileExists(check.file)) {
      log.success(check.name);
      passed++;
    } else {
      log.error(check.name);
    }
  });

  return { total: checks.length, passed };
}

// Verify component implementations
function verifyComponents() {
  log.section('🧩 Verifying Key Components');

  const components = [
    { name: 'Layout', file: 'src/components/Layout.jsx', content: 'Outlet' },
    { name: 'Header', file: 'src/components/Header.jsx', content: 'LanguageSwitcher' },
    { name: 'ProductCard', file: 'src/components/ProductCard.jsx', content: 'addToCart' },
    { name: 'CartItem', file: 'src/components/CartItem.jsx', content: 'updateQuantity' },
    { name: 'SearchBar', file: 'src/components/SearchBar.jsx', content: 'onSearch' },
    { name: 'FilterSidebar', file: 'src/components/FilterSidebar.jsx', content: 'filters' },
    { name: 'LoginForm', file: 'src/components/LoginForm.jsx', content: 'email' },
    { name: 'RegisterForm', file: 'src/components/RegisterForm.jsx', content: 'password' },
  ];

  let passed = 0;
  components.forEach(component => {
    if (fileExists(component.file) && fileContains(component.file, component.content)) {
      log.success(component.name);
      passed++;
    } else {
      log.error(component.name);
    }
  });

  return { total: components.length, passed };
}

// Verify pages implementation
function verifyPages() {
  log.section('📄 Verifying Pages');

  const pages = [
    { name: 'HomePage', file: 'src/pages/HomePage.jsx', content: 'ProductGrid' },
    { name: 'ProductListPage', file: 'src/pages/ProductListPage.jsx', content: 'FilterSidebar' },
    { name: 'ProductDetailPage', file: 'src/pages/ProductDetailPage.jsx', content: 'ImageGallery' },
    { name: 'CartPage', file: 'src/pages/CartPage.jsx', content: 'CartItem' },
    { name: 'CheckoutPage', file: 'src/pages/CheckoutPage.jsx', content: 'shippingAddress' },
    { name: 'PaymentPage', file: 'src/pages/PaymentPage.jsx', content: 'paymentStatus' },
    { name: 'OrderPage', file: 'src/pages/OrderPage.jsx', content: 'orders' },
    { name: 'AuthPage', file: 'src/pages/AuthPage.jsx', content: 'LoginForm' },
    { name: 'UserCenterPage', file: 'src/pages/UserCenterPage.jsx', content: 'addresses' },
  ];

  let passed = 0;
  pages.forEach(page => {
    if (fileExists(page.file) && fileContains(page.file, page.content)) {
      log.success(page.name);
      passed++;
    } else {
      log.error(page.name);
    }
  });

  return { total: pages.length, passed };
}

// Main verification function
function runVerification() {
  console.log('\n' + '='.repeat(60));
  console.log('  GAODIAN QINGBAOJU E-COMMERCE - FLOW VERIFICATION');
  console.log('='.repeat(60));

  const results = {
    files: verifyFiles(),
    redux: verifyReduxStore(),
    routing: verifyRouting(),
    i18n: verifyI18n(),
    components: verifyComponents(),
    pages: verifyPages(),
  };

  // Calculate overall score
  const totalChecks = Object.values(results).reduce((sum, r) => sum + r.total, 0);
  const passedChecks = Object.values(results).reduce((sum, r) => sum + (r.passed || r.existingFiles), 0);
  const percentage = ((passedChecks / totalChecks) * 100).toFixed(1);

  // Print summary
  log.section('📊 Verification Summary');
  console.log(`\nFiles:      ${results.files.existingFiles}/${results.files.totalFiles}`);
  console.log(`Redux:      ${results.redux.passed}/${results.redux.total}`);
  console.log(`Routing:    ${results.routing.passed}/${results.routing.total}`);
  console.log(`i18n:       ${results.i18n.passed}/${results.i18n.total}`);
  console.log(`Components: ${results.components.passed}/${results.components.total}`);
  console.log(`Pages:      ${results.pages.passed}/${results.pages.total}`);

  console.log('\n' + '='.repeat(60));
  console.log(`Overall: ${passedChecks}/${totalChecks} checks passed (${percentage}%)`);
  console.log('='.repeat(60));

  if (percentage >= 90) {
    log.success('\n✨ Excellent! The application is ready for testing.');
  } else if (percentage >= 70) {
    log.warning('\n⚠️  Good progress, but some components are missing.');
  } else {
    log.error('\n❌ Significant work needed to complete the application.');
  }

  console.log('\n📝 Next Steps:');
  console.log('  1. Start the dev server: npm run dev');
  console.log('  2. Open http://localhost:5173/ in your browser');
  console.log('  3. Test the complete shopping flow manually');
  console.log('  4. Check the CHECKPOINT_14_VERIFICATION.md for detailed checklist\n');

  return percentage >= 90;
}

// Run the verification
const success = runVerification();
process.exit(success ? 0 : 1);
