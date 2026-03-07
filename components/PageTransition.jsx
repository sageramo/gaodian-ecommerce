import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * PageTransition component provides smooth transitions between page changes
 * Automatically animates when the route changes
 */
const PageTransition = ({ children, className = '' }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'exit') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 200); // Match exit animation duration

      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div
      className={`page-transition-${transitionStage} ${className}`}
      style={{
        minHeight: '100%',
      }}
    >
      {children}
    </div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageTransition;
