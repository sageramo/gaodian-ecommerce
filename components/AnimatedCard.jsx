import PropTypes from 'prop-types';
import { useInViewAnimation } from '../hooks/useAnimation';

/**
 * AnimatedCard component that animates when it enters the viewport
 * Wraps content with fade-in-up animation
 */
const AnimatedCard = ({
  children,
  className = '',
  animation = 'animate-fade-in-up',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const { ref, isInView } = useInViewAnimation({
    triggerOnce,
    threshold,
  });

  return (
    <div
      ref={ref}
      className={`${isInView ? animation : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};

AnimatedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animation: PropTypes.string,
  triggerOnce: PropTypes.bool,
  threshold: PropTypes.number,
};

export default AnimatedCard;
