import { Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import './i18n/config'; // Import i18n config FIRST
import { store } from './store';
import { router } from './router';
import { initializeStore } from './store/initializeStore';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import PageLoader from './components/PageLoader';
import './App.css';

// Initialize store with data from localStorage
initializeStore(store);

// Locale mapping for Ant Design
const localeMap = {
  zh: zhCN,
  en: enUS,
  ja: jaJP,
};

function AppContent() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(localeMap[i18n.language] || zhCN);

  useEffect(() => {
    // Update Ant Design locale when language changes
    const handleLanguageChange = (lng) => {
      setLocale(localeMap[lng] || zhCN);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <ConfigProvider locale={locale}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
        <LoadingIndicator />
        <Toast />
      </Suspense>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
