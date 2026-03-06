import { useState, useEffect } from 'react';
import { Card, Tabs, Descriptions, Table, Button, Modal, Form, Input, message, Tag, Empty } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  EnvironmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  addAddress, 
  updateAddress, 
  removeAddress, 
  setDefaultAddress 
} from '../store/slices/authSlice';
import './UserCenterPage.css';

/**
 * UserCenterPage component - displays user information, order history, and address management
 * Requirements: 3.6
 */
const UserCenterPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm] = Form.useForm();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      message.warning(t('error.unauthorized'));
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate, t]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Handle address modal
  const handleAddAddress = () => {
    setEditingAddress(null);
    addressForm.resetFields();
    setAddressModalVisible(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    addressForm.setFieldsValue(address);
    setAddressModalVisible(true);
  };

  const handleDeleteAddress = (addressId) => {
    Modal.confirm({
      title: t('common.confirm'),
      content: t('user.confirmDeleteAddress', '确定要删除这个地址吗？'),
      onOk: () => {
        dispatch(removeAddress(addressId));
        message.success(t('common.success'));
      },
    });
  };

  const handleSetDefaultAddress = (addressId) => {
    dispatch(setDefaultAddress(addressId));
    message.success(t('user.defaultAddressSet', '已设置为默认地址'));
  };

  const handleAddressSubmit = (values) => {
    if (editingAddress) {
      // Update existing address
      dispatch(updateAddress({
        addressId: editingAddress.id,
        updates: values,
      }));
      message.success(t('user.addressUpdated', '地址已更新'));
    } else {
      // Add new address
      const newAddress = {
        id: Date.now().toString(),
        ...values,
        isDefault: user.addresses.length === 0, // First address is default
      };
      dispatch(addAddress(newAddress));
      message.success(t('user.addressAdded', '地址已添加'));
    }
    setAddressModalVisible(false);
    addressForm.resetFields();
  };

  // Order status color mapping
  const getOrderStatusColor = (status) => {
    const colorMap = {
      pending: 'orange',
      paid: 'blue',
      processing: 'cyan',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return colorMap[status] || 'default';
  };

  // Order columns
  const orderColumns = [
    {
      title: t('order.orderNumber'),
      dataIndex: 'id',
      key: 'id',
      width: 180,
    },
    {
      title: t('order.orderDate'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: t('order.total'),
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount, record) => `${record.currency} ${amount.toFixed(2)}`,
    },
    {
      title: t('order.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={getOrderStatusColor(status)}>
          {t(`order.${status}`)}
        </Tag>
      ),
    },
    {
      title: t('common.action', '操作'),
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/orders/${record.id}`)}
        >
          {t('order.orderDetail')}
        </Button>
      ),
    },
  ];

  // Tab items
  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          {t('user.profile')}
        </span>
      ),
      children: (
        <Card>
          <Descriptions
            title={t('user.profile')}
            bordered
            column={1}
          >
            <Descriptions.Item label={t('auth.name')}>
              {user.name}
            </Descriptions.Item>
            <Descriptions.Item label={t('auth.email')}>
              {user.email}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.language')}>
              {user.preferredLanguage === 'zh' && '中文'}
              {user.preferredLanguage === 'en' && 'English'}
              {user.preferredLanguage === 'ja' && '日本語'}
            </Descriptions.Item>
            <Descriptions.Item label={t('user.memberSince', '注册时间')}>
              {new Date(user.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
    {
      key: 'orders',
      label: (
        <span>
          <ShoppingOutlined />
          {t('user.orderHistory')}
        </span>
      ),
      children: (
        <Card>
          {orders && orders.length > 0 ? (
            <Table
              columns={orderColumns}
              dataSource={orders}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `${t('common.total', '共')} ${total} ${t('order.title', '订单')}`,
              }}
            />
          ) : (
            <Empty
              description={t('order.noOrders', '暂无订单')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => navigate('/products')}>
                {t('cart.continueShopping')}
              </Button>
            </Empty>
          )}
        </Card>
      ),
    },
    {
      key: 'addresses',
      label: (
        <span>
          <EnvironmentOutlined />
          {t('user.addressBook')}
        </span>
      ),
      children: (
        <Card
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddAddress}
            >
              {t('user.addAddress', '添加地址')}
            </Button>
          }
        >
          {user.addresses && user.addresses.length > 0 ? (
            <div className="address-list">
              {user.addresses.map((address) => (
                <Card
                  key={address.id}
                  className={`address-card ${address.isDefault ? 'default-address' : ''}`}
                  size="small"
                >
                  {address.isDefault && (
                    <Tag color="blue" className="default-tag">
                      <CheckCircleOutlined /> {t('user.defaultAddress', '默认地址')}
                    </Tag>
                  )}
                  <div className="address-info">
                    <div className="address-recipient">
                      <strong>{address.recipientName}</strong>
                      <span className="address-phone">{address.phone}</span>
                    </div>
                    <div className="address-detail">
                      {address.country} {address.province} {address.city} {address.district}
                    </div>
                    <div className="address-street">{address.street}</div>
                    <div className="address-postal">{t('user.postalCode', '邮编')}: {address.postalCode}</div>
                  </div>
                  <div className="address-actions">
                    {!address.isDefault && (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        {t('user.setDefault', '设为默认')}
                      </Button>
                    )}
                    <Button
                      type="link"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEditAddress(address)}
                    >
                      {t('common.edit')}
                    </Button>
                    <Button
                      type="link"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      {t('common.delete')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Empty
              description={t('user.noAddresses', '暂无收货地址')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
                {t('user.addAddress', '添加地址')}
              </Button>
            </Empty>
          )}
        </Card>
      ),
    },
  ];

  return (
    <div className="user-center-page">
      <div className="user-center-container">
        <div className="user-center-header">
          <h1>{t('nav.userCenter')}</h1>
          <p className="user-welcome">
            {t('user.welcome', '欢迎')}, {user.name}!
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
        />
      </div>

      {/* Address Modal */}
      <Modal
        title={editingAddress ? t('user.editAddress', '编辑地址') : t('user.addAddress', '添加地址')}
        open={addressModalVisible}
        onCancel={() => {
          setAddressModalVisible(false);
          addressForm.resetFields();
        }}
        onOk={() => addressForm.submit()}
        width={600}
      >
        <Form
          form={addressForm}
          layout="vertical"
          onFinish={handleAddressSubmit}
        >
          <Form.Item
            name="recipientName"
            label={t('user.recipientName', '收件人')}
            rules={[{ required: true, message: t('user.recipientNameRequired', '请输入收件人姓名') }]}
          >
            <Input placeholder={t('user.recipientNamePlaceholder', '请输入收件人姓名')} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={t('user.phone', '电话')}
            rules={[{ required: true, message: t('user.phoneRequired', '请输入电话号码') }]}
          >
            <Input placeholder={t('user.phonePlaceholder', '请输入电话号码')} />
          </Form.Item>

          <Form.Item
            name="country"
            label={t('user.country', '国家')}
            rules={[{ required: true, message: t('user.countryRequired', '请输入国家') }]}
          >
            <Input placeholder={t('user.countryPlaceholder', '请输入国家')} />
          </Form.Item>

          <Form.Item
            name="province"
            label={t('user.province', '省/州')}
            rules={[{ required: true, message: t('user.provinceRequired', '请输入省/州') }]}
          >
            <Input placeholder={t('user.provincePlaceholder', '请输入省/州')} />
          </Form.Item>

          <Form.Item
            name="city"
            label={t('user.city', '城市')}
            rules={[{ required: true, message: t('user.cityRequired', '请输入城市') }]}
          >
            <Input placeholder={t('user.cityPlaceholder', '请输入城市')} />
          </Form.Item>

          <Form.Item
            name="district"
            label={t('user.district', '区/县')}
            rules={[{ required: true, message: t('user.districtRequired', '请输入区/县') }]}
          >
            <Input placeholder={t('user.districtPlaceholder', '请输入区/县')} />
          </Form.Item>

          <Form.Item
            name="street"
            label={t('user.street', '街道地址')}
            rules={[{ required: true, message: t('user.streetRequired', '请输入街道地址') }]}
          >
            <Input.TextArea
              rows={3}
              placeholder={t('user.streetPlaceholder', '请输入详细街道地址')}
            />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label={t('user.postalCode', '邮政编码')}
            rules={[{ required: true, message: t('user.postalCodeRequired', '请输入邮政编码') }]}
          >
            <Input placeholder={t('user.postalCodePlaceholder', '请输入邮政编码')} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserCenterPage;
