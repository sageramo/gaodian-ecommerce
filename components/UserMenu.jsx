import { Dropdown, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { userStorage } from '../utils/localStorage';
import './UserMenu.css';

const { Text } = Typography;

/**
 * UserMenu component - displays user avatar and dropdown menu
 * Requirements: 3.2
 */
const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());
    dispatch(clearCart());
    
    // Clear localStorage
    userStorage.clearAll();
    
    // Navigate to home
    navigate('/');
  };

  const handleUserCenter = () => {
    navigate('/user-center');
  };

  // Handle menu item clicks - unified click handler at menu level
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'user-center':
        handleUserCenter();
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: 'user-center',
      icon: <UserOutlined />,
      label: t('nav.userCenter'),
    },
    {
      key: 'orders',
      icon: <SettingOutlined />,
      label: t('nav.orders'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('nav.logout'),
      danger: true,
    },
  ];

  if (!isAuthenticated || !user) {
    return null;
  }

  // Ensure user.name is a string to prevent object rendering errors
  const userName = typeof user?.name === 'string' ? user.name : String(user?.name || t('user.welcome'));

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: handleMenuClick }}
      placement="bottomRight"
      trigger={['click']}
      className="user-menu"
    >
      <Space className="user-menu-trigger" style={{ cursor: 'pointer' }}>
        <Avatar
          size="default"
          icon={<UserOutlined />}
          className="user-avatar"
        />
        <Text className="user-name">{userName}</Text>
      </Space>
    </Dropdown>
  );
};

export default UserMenu;
