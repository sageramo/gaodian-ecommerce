import { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { 
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
  BookOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import LanguageSwitcher from './LanguageSwitcher';
import CartIcon from './CartIcon';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const user = useSelector((state) => state.auth?.user);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/auth?mode=login');
  };

  // Mobile navigation items
  const mobileNavItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: t('nav.home'),
      onClick: () => {
        navigate('/');
        setMobileMenuOpen(false);
      },
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: t('nav.products'),
      onClick: () => {
        navigate('/products');
        setMobileMenuOpen(false);
      },
    },
    {
      key: 'heritage',
      icon: <BookOutlined />,
      label: t('nav.heritage'),
      onClick: () => {
        navigate('/heritage');
        setMobileMenuOpen(false);
      },
    },
  ];

  return (
    <AntHeader className="header-container">
      <div className="header-content">
        {/* Mobile Menu Button */}
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
        />

        {/* Logo */}
        <div className="header-logo" onClick={handleLogoClick}>
          <img 
            src="/images/logo.png" 
            alt="糕点情报局" 
            className="logo-image"
          />
          <span className="logo-text brand-name brand-name--on-light">糕点情报局</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <a onClick={() => navigate('/')}>{t('nav.home')}</a>
          <a onClick={() => navigate('/products')}>{t('nav.products')}</a>
          <a onClick={() => navigate('/heritage')}>{t('nav.heritage')}</a>
        </nav>

        {/* Search Bar */}
        <div className="header-search">
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="header-action-item desktop-only">
            <LanguageSwitcher />
          </div>

          {/* Cart Icon */}
          <div className="header-action-item">
            <CartIcon />
          </div>

          {/* User Menu or Login Button */}
          <div className="header-action-item desktop-only">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={handleLoginClick}
                className="login-button"
              >
                {t('nav.login')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={t('common.menu', '菜单')}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="mobile-drawer"
      >
        <div className="mobile-menu-content">
          {/* Mobile Navigation */}
          <div className="mobile-nav-items">
            {mobileNavItems.map((item) => (
              <div
                key={item.key}
                className="mobile-nav-item"
                onClick={item.onClick}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="mobile-language-section">
            <div className="mobile-section-title">{t('user.language')}</div>
            <LanguageSwitcher />
          </div>

          {/* Mobile User Menu */}
          <div className="mobile-user-section">
            {isAuthenticated ? (
              <>
                <div
                  className="mobile-user-item"
                  onClick={() => {
                    navigate('/user-center');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.userCenter')}
                </div>
                <div
                  className="mobile-user-item"
                  onClick={() => {
                    navigate('/orders');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.orders')}
                </div>
                <div className="mobile-divider" />
                <div
                  className="mobile-user-item danger"
                  onClick={() => {
                    // Logout will be handled by UserMenu component
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.logout')}
                </div>
              </>
            ) : (
              <>
                <div
                  className="mobile-user-item"
                  onClick={() => {
                    navigate('/auth?mode=login');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.login')}
                </div>
                <div
                  className="mobile-user-item"
                  onClick={() => {
                    navigate('/auth?mode=register');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.register')}
                </div>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
