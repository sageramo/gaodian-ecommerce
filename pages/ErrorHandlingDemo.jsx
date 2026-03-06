import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../hooks/useToast';
import { getErrorMessage, createError } from '../utils/errorHandler';
import './ErrorHandlingDemo.css';

/**
 * Error Handling Demo Page
 * Demonstrates the error handling and toast notification system
 * This is for development/testing purposes only
 */
function ErrorHandlingDemo() {
  const { t } = useTranslation();
  const toast = useToast();
  const [throwError, setThrowError] = useState(false);

  // Simulate different types of errors
  const simulateNetworkError = () => {
    const error = createError(0, 'Network error');
    toast.error(error);
  };

  const simulateServerError = () => {
    const error = createError(500, 'Internal server error');
    toast.error(error);
  };

  const simulateAuthError = () => {
    const error = createError(401, 'Unauthorized access');
    toast.error(error);
  };

  const simulateValidationError = () => {
    const error = createError(422, 'Validation failed', {
      email: 'Invalid email format',
      password: 'Password too short',
    });
    toast.error(error);
  };

  const showSuccessToast = () => {
    toast.success(t('cart.addedToCart'));
  };

  const showWarningToast = () => {
    toast.warning('This is a warning message');
  };

  const showInfoToast = () => {
    toast.info('This is an informational message');
  };

  const showCustomToast = () => {
    toast.success('Custom duration toast', 'Custom Title', 10000);
  };

  const triggerComponentError = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('This is a test error to demonstrate ErrorBoundary');
  }

  return (
    <div className="error-demo">
      <div className="error-demo-container">
        <h1 className="error-demo-title">Error Handling & Toast Demo</h1>
        <p className="error-demo-description">
          This page demonstrates the error handling and toast notification system.
        </p>

        <section className="error-demo-section">
          <h2>Toast Notifications</h2>
          <div className="error-demo-buttons">
            <button
              className="demo-button demo-button-success"
              onClick={showSuccessToast}
            >
              Show Success Toast
            </button>
            <button
              className="demo-button demo-button-error"
              onClick={() => toast.error('This is an error message')}
            >
              Show Error Toast
            </button>
            <button
              className="demo-button demo-button-warning"
              onClick={showWarningToast}
            >
              Show Warning Toast
            </button>
            <button
              className="demo-button demo-button-info"
              onClick={showInfoToast}
            >
              Show Info Toast
            </button>
            <button
              className="demo-button demo-button-custom"
              onClick={showCustomToast}
            >
              Show Custom Toast (10s)
            </button>
          </div>
        </section>

        <section className="error-demo-section">
          <h2>Error Handling</h2>
          <div className="error-demo-buttons">
            <button
              className="demo-button demo-button-error"
              onClick={simulateNetworkError}
            >
              Simulate Network Error
            </button>
            <button
              className="demo-button demo-button-error"
              onClick={simulateServerError}
            >
              Simulate Server Error (500)
            </button>
            <button
              className="demo-button demo-button-error"
              onClick={simulateAuthError}
            >
              Simulate Auth Error (401)
            </button>
            <button
              className="demo-button demo-button-error"
              onClick={simulateValidationError}
            >
              Simulate Validation Error
            </button>
          </div>
        </section>

        <section className="error-demo-section">
          <h2>Error Boundary</h2>
          <p className="error-demo-note">
            Click the button below to trigger a component error and see the ErrorBoundary in action.
          </p>
          <button
            className="demo-button demo-button-danger"
            onClick={triggerComponentError}
          >
            Trigger Component Error
          </button>
        </section>

        <section className="error-demo-section">
          <h2>Usage Examples</h2>
          <div className="error-demo-code">
            <h3>Using Toast Hook:</h3>
            <pre>{`
import useToast from '../hooks/useToast';

function MyComponent() {
  const toast = useToast();
  
  // Show success
  toast.success('Operation successful!');
  
  // Show error
  toast.error('Something went wrong');
  
  // Show error from API
  try {
    await api.call();
  } catch (error) {
    toast.error(error); // Automatically formats error
  }
}
            `}</pre>

            <h3>Using Error Handler:</h3>
            <pre>{`
import { getErrorMessage } from '../utils/errorHandler';

const errorMessage = getErrorMessage(error, t);
            `}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ErrorHandlingDemo;
