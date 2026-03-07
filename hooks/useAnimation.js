import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to trigger animations when element enters viewport
 * Uses Intersection Observer API
 */
export function useInViewAnimation(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return {
    ref: elementRef,
    isInView: triggerOnce ? hasAnimated : isInView,
  };
}

/**
 * Custom hook to add stagger animation to list items
 * Returns a function to get delay for each item
 */
export function useStaggerAnimation(baseDelay = 50) {
  const getDelay = (index) => {
    return `${index * baseDelay}ms`;
  };

  const getStyle = (index) => {
    return {
      animationDelay: getDelay(index),
    };
  };

  return { getDelay, getStyle };
}

/**
 * Custom hook to manage animation state
 */
export function useAnimationState(initialState = false) {
  const [isAnimating, setIsAnimating] = useState(initialState);
  const [animationClass, setAnimationClass] = useState('');

  const startAnimation = (className, duration = 300) => {
    setIsAnimating(true);
    setAnimationClass(className);

    setTimeout(() => {
      setIsAnimating(false);
      setAnimationClass('');
    }, duration);
  };

  return {
    isAnimating,
    animationClass,
    startAnimation,
  };
}

/**
 * Custom hook to detect if user prefers reduced motion
 * Useful for disabling animations for accessibility
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Custom hook for sequential animations
 * Useful for animating multiple elements in sequence
 */
export function useSequentialAnimation(items = [], delay = 100) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < items.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (currentIndex === items.length - 1) {
      setIsComplete(true);
    }
  }, [currentIndex, items.length, delay]);

  const start = () => {
    setCurrentIndex(0);
    setIsComplete(false);
  };

  const reset = () => {
    setCurrentIndex(-1);
    setIsComplete(false);
  };

  const shouldAnimate = (index) => {
    return index <= currentIndex;
  };

  return {
    currentIndex,
    isComplete,
    start,
    reset,
    shouldAnimate,
  };
}
