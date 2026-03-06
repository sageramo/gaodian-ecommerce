import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import LanguageSwitcher from '../LanguageSwitcher';
import uiReducer from '../../store/slices/uiSlice';

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  });
};

describe('LanguageSwitcher', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    // Reset language to Chinese before each test
    i18n.changeLanguage('zh');
    localStorage.clear();
  });

  it('renders language switcher with current language', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </Provider>
    );

    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toBeInTheDocument();
  });

  it('changes language when option is selected', async () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </Provider>
    );

    // Initial language should be Chinese
    expect(i18n.language).toBe('zh');

    // Click the select to open dropdown
    const switcher = screen.getByTestId('language-switcher');
    fireEvent.mouseDown(switcher.querySelector('.ant-select-selector'));

    // Wait for dropdown to appear and select English
    const enOption = await screen.findByText(/English/);
    fireEvent.click(enOption);

    // Language should change to English
    expect(i18n.language).toBe('en');
  });

  it('saves language preference to localStorage', async () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </Provider>
    );

    // Change language to Japanese
    i18n.changeLanguage('ja');

    // Wait for the change to propagate
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check localStorage
    expect(localStorage.getItem('language')).toBe('ja');
  });
});
