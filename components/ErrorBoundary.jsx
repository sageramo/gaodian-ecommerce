import React from 'react';
import { useTranslation } from 'react-i18next';
import './ErrorBoundary.css';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Displays a fallback UI instead of crashing the entire app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', {
      message: error?.message || String(error),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack
    });
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error Fallback UI Component
 * Displays when an error is caught by ErrorBoundary
 */
function ErrorFallback({ error, errorInfo, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="error-boundary">
      <div className="error-boundary-content">
        <div className="error-boundary-icon">⚠️</div>
        <h1 className="error-boundary-title">{t('common.error')}</h1>
        <p className="error-boundary-message">
          {t('error.somethingWentWrong')}
        </p>
        
        {import.meta.env.DEV && error && (
          <details className="error-boundary-details">
            <summary>{t('error.errorDetails')}</summary>
            <pre className="error-boundary-stack">
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        )}

        <div className="error-boundary-actions">
          <button
            className="error-boundary-button error-boundary-button-primary"
            onClick={onReset}
          >
            {t('error.tryAgain')}
          </button>
          <button
            className="error-boundary-button error-boundary-button-secondary"
            onClick={() => window.location.href = '/'}
          >
            {t('nav.home')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
