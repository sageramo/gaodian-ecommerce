import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../store/slices/toastSlice';
import './Toast.css';

/**
 * Toast Notification Component
 * Displays temporary notification messages (success, error, warning, info)
 * Auto-dismisses after a timeout or can be manually closed
 */
function Toast() {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
}

/**
 * Individual Toast Item Component
 */
function ToastItem({ toast, onClose }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Auto-dismiss after duration
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, dispatch]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`toast toast-${toast.type} toast-enter`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        <div className="toast-message">{toast.message}</div>
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
