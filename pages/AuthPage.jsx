import { useState } from 'react';
import { Card, Tabs } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css';

/**
 * AuthPage component - handles user authentication (login and registration)
 * Integrates LoginForm and RegisterForm with tab switching
 * Requirements: 3.1, 3.2
 */
const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial tab based on URL or default to login
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    return mode === 'register' ? 'register' : 'login';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  const handleTabChange = (key) => {
    setActiveTab(key);
    // Update URL without navigation
    const params = new URLSearchParams(location.search);
    params.set('mode', key);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const tabItems = [
    {
      key: 'login',
      label: (
        <span>
          <UserOutlined />
          {t('auth.login')}
        </span>
      ),
      children: (
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2>{t('auth.loginTitle')}</h2>
            <p className="auth-form-subtitle">{t('auth.welcomeBack')}</p>
          </div>
          <LoginForm />
          <div className="auth-form-footer">
            <p>
              {t('auth.switchToRegister')}{' '}
              <a onClick={() => handleTabChange('register')} className="auth-switch-link">
                {t('auth.register')}
              </a>
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'register',
      label: (
        <span>
          <UserAddOutlined />
          {t('auth.register')}
        </span>
      ),
      children: (
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2>{t('auth.registerTitle')}</h2>
            <p className="auth-form-subtitle">{t('auth.createAccount')}</p>
          </div>
          <RegisterForm />
          <div className="auth-form-footer">
            <p>
              {t('auth.switchToLogin')}{' '}
              <a onClick={() => handleTabChange('login')} className="auth-switch-link">
                {t('auth.login')}
              </a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <div className="auth-page-content">
          <div className="auth-page-brand">
            <h1 className="auth-page-title brand-name brand-name--on-dark">糕点情报局</h1>
            <p className="auth-page-description">
              {t('heritage.title')} · {t('product.category')}
            </p>
          </div>
          
          <Card className="auth-card" bordered={false}>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={tabItems}
              centered
              size="large"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
