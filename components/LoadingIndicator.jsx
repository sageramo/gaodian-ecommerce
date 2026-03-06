import { useSelector } from 'react-redux';
import './LoadingIndicator.css';

/**
 * Global loading indicator component
 * Displays a loading spinner when API calls are in progress
 * Controlled by the global isLoading state in Redux
 */
const LoadingIndicator = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-indicator-overlay">
      <div className="loading-indicator-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
