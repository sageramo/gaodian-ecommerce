import { useState, memo } from 'react';
import { Card, InputNumber, Button, Image, Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import { calculateItemSubtotal } from '../models/CartItem';
import './CartItem.css';

const { Text, Title } = Typography;

/**
 * CartItem component - displays a single item in the shopping cart
 * Memoized to prevent unnecessary re-renders when other cart items change
 * @param {Object} props
 * @param {Object} props.item - Cart item object
 */
const CartItem = memo(({ item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const subtotal = calculateItemSubtotal(item);

  const handleQuantityChange = (value) => {
    if (value && value > 0) {
      setLoading(true);
      dispatch(updateQuantity({ productId: item.productId, quantity: value }));
      // Simulate async operation
      setTimeout(() => setLoading(false), 200);
    }
  };

  const handleRemove = () => {
    setLoading(true);
    dispatch(removeFromCart(item.productId));
  };

  return (
    <Card className="cart-item" loading={loading}>
      <div className="cart-item-content">
        {/* Product Image */}
        <div className="cart-item-image">
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            preview={false}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        </div>

        {/* Product Info */}
        <div className="cart-item-info">
          <Title level={5} className="cart-item-name">
            {item.name}
          </Title>
          <Text type="secondary" className="cart-item-price">
            ¥{item.price.toFixed(2)}
          </Text>
        </div>

        {/* Quantity Control */}
        <div className="cart-item-quantity">
          <Text type="secondary" className="quantity-label">
            {t('cart.quantity')}
          </Text>
          <InputNumber
            min={1}
            max={99}
            value={item.quantity}
            onChange={handleQuantityChange}
            disabled={loading}
            className="quantity-input"
          />
        </div>

        {/* Subtotal */}
        <div className="cart-item-subtotal">
          <Text type="secondary" className="subtotal-label">
            {t('cart.subtotal')}
          </Text>
          <Text strong className="subtotal-amount">
            ¥{subtotal.toFixed(2)}
          </Text>
        </div>

        {/* Remove Button */}
        <div className="cart-item-actions">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleRemove}
            disabled={loading}
            title={t('cart.remove')}
          >
            <span className="remove-text">{t('cart.remove')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
