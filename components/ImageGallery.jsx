import { useState } from 'react';
import { Image, Row, Col } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import LazyImage from './LazyImage';
import './ImageGallery.css';

/**
 * ImageGallery component - displays product images with carousel and zoom functionality
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {string} props.productName - Product name for alt text
 */
function ImageGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery-empty">
        <div className="empty-placeholder">No images available</div>
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="main-image-container">
        <Image.PreviewGroup>
          <Image
            src={images[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            className="main-image"
            preview={{
              mask: (
                <div className="preview-mask">
                  <ZoomInOutlined />
                  <div>Click to zoom</div>
                </div>
              ),
            }}
          />
        </Image.PreviewGroup>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="thumbnails-container">
          <Row gutter={[8, 8]} justify="start">
            {images.map((image, index) => (
              <Col key={index} span={6}>
                <div
                  className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleThumbnailClick(index);
                    }
                  }}
                >
                  <LazyImage
                    src={image}
                    alt={`${productName} - Thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
