import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CartIcon.css';

/**
 * CartIcon component - displays shopping cart icon with item count badge
 * Clicking navigates to the cart page
 */
const CartIcon = () => {
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state) => state.cart?.totalItems || 0);

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div className="cart-icon-container" onClick={handleClick}>
      <Badge count={cartItemsCount} overflowCount={99} showZero={false}>
        <ShoppingCartOutlined className="cart-icon" />
      </Badge>
    </div>
  );
};

export default CartIcon;
