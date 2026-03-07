import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LazyImage.css';

/**
 * LazyImage component - implements lazy loading using Intersection Observer
 * Images are only loaded when they enter the viewport
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.placeholder - Placeholder image URL (optional)
 * @param {number} props.threshold - Intersection observer threshold (0-1)
 * @param {string} props.rootMargin - Root margin for intersection observer
 */
function LazyImage({
  src,
  alt = '',
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ELoading...%3C/text%3E%3C/svg%3E',
  threshold = 0.01,
  rootMargin = '50px',
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately if IntersectionObserver is not supported
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once the image is in view, we can disconnect the observer
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, threshold, rootMargin]);

  useEffect(() => {
    if (isInView && src) {
      // Create a new image to preload
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };

      img.onerror = () => {
        // On error, keep the placeholder
        console.error(`Failed to load image: ${src}`);
      };
    }
  }, [isInView, src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className}`}
      {...props}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
};

export default LazyImage;
