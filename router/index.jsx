import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/Layout';
import PageLoader from '../components/PageLoader';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductListPage = lazy(() => import('../pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
const OrderPage = lazy(() => import('../pages/OrderPage'));
const HeritagePage = lazy(() => import('../pages/HeritagePage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const UserCenterPage = lazy(() => import('../pages/UserCenterPage'));
const I18nDemo = lazy(() => import('../pages/I18nDemo'));

// Wrapper component to add Suspense to lazy-loaded routes
const LazyRoute = ({ Component }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LazyRoute Component={HomePage} />,
      },
      {
        path: 'products',
        element: <LazyRoute Component={ProductListPage} />,
      },
      {
        path: 'products/:id',
        element: <LazyRoute Component={ProductDetailPage} />,
      },
      {
        path: 'cart',
        element: <LazyRoute Component={CartPage} />,
      },
      {
        path: 'checkout',
        element: <LazyRoute Component={CheckoutPage} />,
      },
      {
        path: 'payment/:orderId',
        element: <LazyRoute Component={PaymentPage} />,
      },
      {
        path: 'orders',
        element: <LazyRoute Component={OrderPage} />,
      },
      {
        path: 'orders/:orderId',
        element: <LazyRoute Component={OrderPage} />,
      },
      {
        path: 'heritage',
        element: <LazyRoute Component={HeritagePage} />,
      },
      {
        path: 'auth',
        element: <LazyRoute Component={AuthPage} />,
      },
      {
        path: 'user-center',
        element: <LazyRoute Component={UserCenterPage} />,
      },
      {
        path: 'i18n-demo',
        element: <LazyRoute Component={I18nDemo} />,
      },
    ],
  },
]);

export default router;
