import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Typography, Divider, Card, Space } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CartItem from '../components/CartItem';
import './CartPage.css';

const { Title, Text } = Typography;

/**
 * CartPage component - displays shopping cart with items and summary
 */
const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.totalItems);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <Title level={2} className="cart-title">
            <ShoppingCartOutlined /> {t('cart.title')}
          </Title>
          <div className="cart-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" size="large">
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {t('cart.empty')}
                  </Text>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingOutlined />}
                    onClick={handleContinueShopping}
                  >
                    {t('cart.continueShopping')}
                  </Button>
                </Space>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="cart-page">
      <div className="cart-container">
        <Title level={2} className="cart-title">
          <ShoppingCartOutlined /> {t('cart.title')}
        </Title>

        <div className="cart-content">
          {/* Cart Items List */}
          <div className="cart-items-section">
            <Card className="cart-items-card">
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-section">
            <Card className="cart-summary-card">
              <Title level={4} className="summary-title">
                {t('cart.title')}
              </Title>
              
              <Divider />

              <div className="summary-row">
                <Text>{t('cart.quantity')}:</Text>
                <Text strong>{totalItems}</Text>
              </div>

              <div className="summary-row">
                <Text>{t('cart.subtotal')}:</Text>
                <Text strong>¥{totalAmount.toFixed(2)}</Text>
              </div>

              <Divider />

              <div className="summary-total">
                <Text strong style={{ fontSize: '16px' }}>
                  {t('cart.total')}:
                </Text>
                <Text strong style={{ fontSize: '24px', color: '#ff4d4f' }}>
                  ¥{totalAmount.toFixed(2)}
                </Text>
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={handleCheckout}
                className="checkout-button"
              >
                {t('cart.checkout')}
              </Button>

              <Button
                size="large"
                block
                onClick={handleContinueShopping}
                className="continue-shopping-button"
              >
                {t('cart.continueShopping')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
