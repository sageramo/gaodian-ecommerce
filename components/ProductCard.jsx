import { memo } from 'react';
import { Card, Button, Tag, Typography, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addToCart } from '../store/slices/cartSlice';
import { HeritageType } from '../models/Product';
import LazyImage from './LazyImage';
import './ProductCard.css';

const { Meta } = Card;
const { Text } = Typography;

/**
 * ProductCard component - displays a product card with image, name, price, and add to cart button
 * Memoized to prevent unnecessary re-renders in product grids
 */
const ProductCard = memo(({ product }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLocalizedName = () => {
    const lang = i18n.language;
    // Support both old format (nameEn, nameJa) and new format (name.en, name.ja)
    if (product.name && typeof product.name === 'object') {
      return product.name[lang] || product.name.zh || product.name;
    }
    if (lang === 'en' && product.nameEn) return product.nameEn;
    if (lang === 'ja' && product.nameJa) return product.nameJa;
    return product.name;
  };

  const getCategoryLabel = () => {
    // Map category to localized label
    const categoryMap = {
      'beijing-classic': '京式经典',
      'festival-special': '节令糕点',
      'gift-box': '礼盒装',
      'daily-snack': '日常小吃',
    };
    
    // If product has category, use it; otherwise fall back to heritageType
    if (product.category) {
      return categoryMap[product.category] || product.category;
    }
    
    // Fallback to heritage type for backward compatibility
    const heritageMap = {
      [HeritageType.MAHJONG]: '麻将',
      [HeritageType.GO]: '围棋',
      [HeritageType.CHESS]: '象棋',
      [HeritageType.DOMINOES]: '骨牌',
      [HeritageType.OTHER]: '全部',
    };
    return heritageMap[product.heritageType] || product.heritageType;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (product.stock <= 0) {
      message.warning('商品已售罄');
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        name: getLocalizedName(),
        price: product.price,
        image: product.images[0],
        quantity: 1,
      })
    );

    message.success('已添加到购物车');
  };

  const handleViewDetail = () => {
    navigate(`/products/${product.id}`);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <Card
      hoverable={!isOutOfStock}
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
      onClick={handleViewDetail}
      cover={
        <div className="product-card-image-wrapper">
          <LazyImage
            alt={getLocalizedName()}
            src={product.images[0]}
            className="product-card-image"
          />
          {isOutOfStock && (
            <div className="sold-out-overlay">
              <Tag color="red" className="sold-out-tag">
                售罄
              </Tag>
            </div>
          )}
        </div>
      }
    >
      <Meta
        title={
          <div className="product-card-title">
            <Text ellipsis={{ tooltip: getLocalizedName() }}>
              {getLocalizedName()}
            </Text>
          </div>
        }
        description={
          <div className="product-card-content">
            <div className="product-card-heritage">
              <Tag color="blue">{getCategoryLabel()}</Tag>
            </div>
            <div className="product-card-price">
              <Text strong className="price-amount">
                ¥{product.price.toFixed(2)}
              </Text>
            </div>
            <div className="product-card-stock">
              <Text type="secondary" className="stock-text">
                库存: {product.stock}
              </Text>
            </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              block
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="add-to-cart-button"
            >
              加入购物车
            </Button>
          </div>
        }
      />
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nameEn: PropTypes.string,
    nameJa: PropTypes.string,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    heritageType: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
