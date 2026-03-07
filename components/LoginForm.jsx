import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { mergeCart } from '../store/slices/cartSlice';
import { isValidEmail } from '../models/User';
import { userStorage, cartStorage } from '../utils/localStorage';
import './LoginForm.css';

/**
 * LoginForm component - handles user login
 */
const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (values) => {
    const { email, password } = values;

    // Start login process
    dispatch(loginStart());

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in real app, this would be done by backend
      if (email === 'test@example.com' && password === 'password123') {
        // Mock user data
        const userData = {
          id: '1',
          email: email,
          name: 'Test User',
          preferredLanguage: 'zh',
          addresses: [],
          createdAt: new Date().toISOString(),
        };

        // Login success
        dispatch(loginSuccess(userData));

        // Save user and token to localStorage
        userStorage.saveUser(userData);
        userStorage.saveAuthToken('mock_token_' + userData.id); // Mock token

        // Merge local cart with server cart
        // In real app, fetch server cart from API
        // For now, we'll simulate an empty server cart
        const serverCart = { items: [] }; // TODO: Fetch from API
        
        // Get current local cart
        const localCart = cartStorage.getCart();
        
        // Merge carts - the mergeCart action will handle the logic
        dispatch(mergeCart(serverCart));
        
        // Save merged cart back to localStorage
        // This will be done automatically by the cart middleware in a real app
        
        message.success(t('auth.loginSuccess'));
        
        // Navigate to home or previous page
        navigate('/');
      } else {
        // Login failed
        throw new Error(t('auth.invalidCredentials'));
      }
    } catch (err) {
      dispatch(loginFailure(err.message || t('auth.loginFailed')));
      message.error(err.message || t('auth.loginFailed'));
    }
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error(t('auth.emailRequired')));
    }
    if (!isValidEmail(value)) {
      return Promise.reject(new Error(t('auth.invalidEmail')));
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error(t('auth.passwordRequired')));
    }
    if (value.length < 8) {
      return Promise.reject(new Error(t('auth.passwordTooShort')));
    }
    return Promise.resolve();
  };

  return (
    <div className="login-form-container">
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          name="email"
          label={t('auth.email')}
          rules={[{ validator: validateEmail }]}
          validateTrigger="onBlur"
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('auth.emailPlaceholder')}
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={t('auth.password')}
          rules={[{ validator: validatePassword }]}
          validateTrigger="onBlur"
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.passwordPlaceholder')}
            size="large"
            disabled={loading}
          />
        </Form.Item>

        {error && (
          <div className="login-error">
            <span className="error-text">{error}</span>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="login-button"
          >
            {t('auth.login')}
          </Button>
        </Form.Item>

        <div className="login-help">
          <a href="#" className="forgot-password">
            {t('auth.forgotPassword')}
          </a>
        </div>

        <div className="login-demo-hint">
          <p>{t('auth.demoHint')}</p>
          <p>
            <strong>Email:</strong> test@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
