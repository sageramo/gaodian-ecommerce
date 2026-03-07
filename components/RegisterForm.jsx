import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerStart, registerSuccess, registerFailure } from '../store/slices/authSlice';
import { isValidEmail, isValidPassword } from '../models/User';
import { userStorage } from '../utils/localStorage';
import './RegisterForm.css';

/**
 * RegisterForm component - handles user registration
 */
const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (values) => {
    const { name, email, password } = values;

    // Start registration process
    dispatch(registerStart());

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user creation
      const userData = {
        id: Date.now().toString(),
        email: email,
        name: name,
        preferredLanguage: 'zh',
        addresses: [],
        createdAt: new Date().toISOString(),
      };

      // Registration success
      dispatch(registerSuccess(userData));

      // Save user and token to localStorage
      userStorage.saveUser(userData);
      userStorage.saveAuthToken('mock_token_' + userData.id); // Mock token

      message.success(t('auth.registerSuccess'));
      
      // Navigate to home
      navigate('/');
    } catch (err) {
      dispatch(registerFailure(err.message || t('auth.registerFailed')));
      message.error(err.message || t('auth.registerFailed'));
    }
  };

  const validateName = (_, value) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error(t('auth.nameRequired')));
    }
    if (value.trim().length < 2) {
      return Promise.reject(new Error(t('auth.nameTooShort')));
    }
    return Promise.resolve();
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
    if (!isValidPassword(value)) {
      return Promise.reject(new Error(t('auth.passwordTooShort')));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error(t('auth.confirmPasswordRequired')));
    }
    const password = form.getFieldValue('password');
    if (value !== password) {
      return Promise.reject(new Error(t('auth.passwordMismatch')));
    }
    return Promise.resolve();
  };

  return (
    <div className="register-form-container">
      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="register-form"
      >
        <Form.Item
          name="name"
          label={t('auth.name')}
          rules={[{ validator: validateName }]}
          validateTrigger="onBlur"
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('auth.namePlaceholder')}
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('auth.email')}
          rules={[{ validator: validateEmail }]}
          validateTrigger="onBlur"
        >
          <Input
            prefix={<MailOutlined />}
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
          help={t('auth.passwordHint')}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.passwordPlaceholder')}
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={t('auth.confirmPassword')}
          rules={[{ validator: validateConfirmPassword }]}
          validateTrigger="onBlur"
          dependencies={['password']}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.confirmPasswordPlaceholder')}
            size="large"
            disabled={loading}
          />
        </Form.Item>

        {error && (
          <div className="register-error">
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
            className="register-button"
          >
            {t('auth.register')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
