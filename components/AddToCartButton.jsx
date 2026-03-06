import { useState } from 'react';
import { Button, InputNumber, Space, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../store/slices/cartSlice';
import './AddToCartButton.css';

/**
 * AddToCartButton component - handles adding products to cart with quantity selection
 * @param {Object} props
 * @param {Object} props.product - Product object
 * @param {string} props.product.id - Product ID
 * @param {string} props.product.name - Product name
 * @param {number} props.product.price - Product price
 * @param {string} props.product.image - Product image URL
 * @param {number} props.product.stock - Available stock
 * @param {boolean} props.showQuantity - Whether to show quantity selector
 * @param {number} props.defaultQuantity - Default quantity value
 * @param {string} props.size - Button size ('small', 'middle', 'large')
 * @param {boolean} props.block - Whether button should be full width
 * @param {Function} props.onSuccess - Callback after successful add to cart
 */
function AddToCartButton({
  product,
  showQuantity = false,
  defaultQuantity = 1,
  size = 'middle',
  block = false,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [loading, setLoading] = useState(false);

  const isOutOfStock = !product || product.stock <= 0;

  const handleAddToCart = async () => {
    if (!product) {
      message.error(t('error.validationError'));
      return;
    }

    if (isOutOfStock) {
      message.warning(t('product.soldOut'));
      return;
    }

    if (quantity > product.stock) {
      message.warning(`${t('product.stock')}: ${product.stock}`);
      return;
    }

    if (quantity < 1) {
      message.warning(t('cart.quantity') + ' >= 1');
      return;
    }

    setLoading(true);

    try {
      // Add to Redux store (middleware will handle localStorage sync)
      dispatch(
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        })
      );

      message.success(t('cart.addedToCart'));

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(quantity);
      }

      // Reset quantity to default after successful add
      if (showQuantity) {
        setQuantity(defaultQuantity);
      }
    } catch (error) {
      console.error('Error adding to cart:', error?.message || String(error));
      message.error(t('error.networkError'));
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value) => {
    if (value && value > 0) {
      setQuantity(value);
    }
  };

  if (showQuantity) {
    return (
      <Space.Compact className="add-to-cart-with-quantity" block={block}>
        <InputNumber
          min={1}
          max={product?.stock || 999}
          value={quantity}
          onChange={handleQuantityChange}
          disabled={isOutOfStock || loading}
          className="quantity-input"
        />
        <Button
          type="primary"
          size={size}
          icon={<ShoppingCartOutlined />}
          disabled={isOutOfStock}
          loading={loading}
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          {t('product.addToCart')}
        </Button>
      </Space.Compact>
    );
  }

  return (
    <Button
      type="primary"
      size={size}
      icon={<ShoppingCartOutlined />}
      disabled={isOutOfStock}
      loading={loading}
      onClick={handleAddToCart}
      block={block}
      className="add-to-cart-btn"
    >
      {t('product.addToCart')}
    </Button>
  );
}

export default AddToCartButton;
