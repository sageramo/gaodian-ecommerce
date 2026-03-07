import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  List,
  Typography,
  Tag,
  Space,
  Button,
  Empty,
  Divider,
  Descriptions,
  Timeline,
  Modal,
} from 'antd';
import {
  ShoppingOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { OrderStatus, PaymentStatus } from '../models/Order';
import './OrderPage.css';

const { Title, Text } = Typography;

const OrderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { orders } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (orderId) {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setDetailModalVisible(true);
      }
    }
  }, [orderId, orders]);

  const getStatusColor = (status) => {
    const colorMap = {
      [OrderStatus.PENDING]: 'orange',
      [OrderStatus.PAID]: 'blue',
      [OrderStatus.PROCESSING]: 'cyan',
      [OrderStatus.SHIPPED]: 'purple',
      [OrderStatus.DELIVERED]: 'green',
      [OrderStatus.CANCELLED]: 'red',
    };
    return colorMap[status] || 'default';
  };

  const getPaymentStatusColor = (status) => {
    const colorMap = {
      [PaymentStatus.PENDING]: 'orange',
      [PaymentStatus.COMPLETED]: 'green',
      [PaymentStatus.FAILED]: 'red',
      [PaymentStatus.REFUNDED]: 'purple',
    };
    return colorMap[status] || 'default';
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleCloseDetail = () => {
    setDetailModalVisible(false);
    if (orderId) {
      navigate('/orders');
    }
  };

  const handlePayOrder = (order) => {
    navigate(`/payment/${order.id}`);
  };

  const getOrderTimeline = (order) => {
    const timeline = [
      {
        label: t('order.orderCreated'),
        time: order.createdAt,
        icon: <ShoppingOutlined />,
        color: 'blue',
      },
    ];

    if (order.status !== OrderStatus.PENDING) {
      timeline.push({
        label: t('order.paid'),
        time: order.updatedAt,
        icon: <CheckCircleOutlined />,
        color: 'green',
      });
    }

    if (order.status === OrderStatus.PROCESSING) {
      timeline.push({
        label: t('order.processing'),
        time: order.updatedAt,
        icon: <ClockCircleOutlined />,
        color: 'cyan',
      });
    }

    if (order.status === OrderStatus.SHIPPED) {
      timeline.push({
        label: t('order.shipped'),
        time: order.updatedAt,
        icon: <CarOutlined />,
        color: 'purple',
      });
    }

    if (order.status === OrderStatus.DELIVERED) {
      timeline.push({
        label: t('order.delivered'),
        time: order.updatedAt,
        icon: <CheckCircleOutlined />,
        color: 'green',
      });
    }

    return timeline;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <Title level={2}>
          <ShoppingOutlined /> {t('order.title')}
        </Title>

        {orders.length === 0 ? (
          <Card>
            <Empty
              description={t('user.noOrders')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => navigate('/')}>
                {t('cart.continueShopping')}
              </Button>
            </Empty>
          </Card>
        ) : (
          <List
            className="order-list"
            dataSource={orders}
            renderItem={(order) => (
              <Card
                key={order.id}
                className="order-card"
                hoverable
                onClick={() => handleViewDetail(order)}
              >
                <div className="order-header">
                  <Space direction="vertical" size="small">
                    <Text type="secondary">
                      {t('order.orderNumber')}: {order.id}
                    </Text>
                    <Text type="secondary">
                      {t('order.orderDate')}:{' '}
                      {new Date(order.createdAt).toLocaleString()}
                    </Text>
                  </Space>
                  <Space>
                    <Tag color={getStatusColor(order.status)}>
                      {t(`order.${order.status}`)}
                    </Tag>
                    <Tag color={getPaymentStatusColor(order.paymentStatus)}>
                      {t(`order.payment${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`)}
                    </Tag>
                  </Space>
                </div>

                <Divider />

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.productId} className="order-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                      />
                      <div className="order-item-info">
                        <Text strong>{item.name}</Text>
                        <Text type="secondary">
                          ¥{item.price.toFixed(2)} × {item.quantity}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />

                <div className="order-footer">
                  <div>
                    <Text type="secondary">{t('order.total')}: </Text>
                    <Text strong style={{ fontSize: '18px', color: '#ff4d4f' }}>
                      ¥{order.totalAmount.toFixed(2)}
                    </Text>
                  </div>
                  <Space>
                    {order.paymentStatus === PaymentStatus.PENDING && (
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayOrder(order);
                        }}
                      >
                        {t('order.payNow')}
                      </Button>
                    )}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetail(order);
                      }}
                    >
                      {t('order.viewOrderDetail')}
                    </Button>
                  </Space>
                </div>
              </Card>
            )}
          />
        )}

        {/* Order Detail Modal */}
        <Modal
          title={
            <Space>
              <ShoppingOutlined />
              <span>{t('order.orderDetail')}</span>
            </Space>
          }
          open={detailModalVisible}
          onCancel={handleCloseDetail}
          footer={null}
          width={800}
          className="order-detail-modal"
        >
          {selectedOrder && (
            <div className="order-detail">
              {/* Order Status */}
              <Card
                title={t('order.status')}
                size="small"
                style={{ marginBottom: '16px' }}
              >
                <Space size="large">
                  <Tag color={getStatusColor(selectedOrder.status)} style={{ fontSize: '14px' }}>
                    {t(`order.${selectedOrder.status}`)}
                  </Tag>
                  <Tag
                    color={getPaymentStatusColor(selectedOrder.paymentStatus)}
                    style={{ fontSize: '14px' }}
                  >
                    {t(`order.payment${selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}`)}
                  </Tag>
                </Space>
              </Card>

              {/* Order Timeline */}
              <Card
                title={t('order.orderTimeline')}
                size="small"
                style={{ marginBottom: '16px' }}
              >
                <Timeline
                  items={getOrderTimeline(selectedOrder).map((item) => ({
                    color: item.color,
                    dot: item.icon,
                    children: (
                      <div>
                        <Text strong>{item.label}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(item.time).toLocaleString()}
                        </Text>
                      </div>
                    ),
                  }))}
                />
              </Card>

              {/* Order Items */}
              <Card
                title={t('order.orderItems')}
                size="small"
                style={{ marginBottom: '16px' }}
              >
                <List
                  dataSource={selectedOrder.items}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        }
                        title={item.name}
                        description={
                          <Space>
                            <Text>¥{item.price.toFixed(2)}</Text>
                            <Text type="secondary">× {item.quantity}</Text>
                          </Space>
                        }
                      />
                      <Text strong>¥{(item.price * item.quantity).toFixed(2)}</Text>
                    </List.Item>
                  )}
                />
                <Divider />
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: '18px' }}>
                    {t('order.total')}: ¥{selectedOrder.totalAmount.toFixed(2)}
                  </Text>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card
                title={
                  <Space>
                    <EnvironmentOutlined />
                    <span>{t('order.shippingAddress')}</span>
                  </Space>
                }
                size="small"
                style={{ marginBottom: '16px' }}
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label={t('user.recipientName')}>
                    {selectedOrder.shippingAddress.recipientName}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('user.phone')}>
                    {selectedOrder.shippingAddress.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('order.address')}>
                    {selectedOrder.shippingAddress.country}{' '}
                    {selectedOrder.shippingAddress.province}{' '}
                    {selectedOrder.shippingAddress.city}{' '}
                    {selectedOrder.shippingAddress.district}{' '}
                    {selectedOrder.shippingAddress.street}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('user.postalCode')}>
                    {selectedOrder.shippingAddress.postalCode}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Payment Info */}
              <Card
                title={
                  <Space>
                    <CreditCardOutlined />
                    <span>{t('order.paymentInfo')}</span>
                  </Space>
                }
                size="small"
                style={{ marginBottom: '16px' }}
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label={t('order.paymentMethod')}>
                    {t(`order.${selectedOrder.paymentMethod}`)}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('order.paymentStatus')}>
                    <Tag color={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                      {t(`order.payment${selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}`)}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Tracking Info */}
              {selectedOrder.trackingNumber && (
                <Card
                  title={
                    <Space>
                      <CarOutlined />
                      <span>{t('order.trackingInfo')}</span>
                    </Space>
                  }
                  size="small"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={t('order.trackingNumber')}>
                      {selectedOrder.trackingNumber}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              )}

              {/* Actions */}
              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <Space>
                  {selectedOrder.paymentStatus === PaymentStatus.PENDING && (
                    <Button type="primary" onClick={() => handlePayOrder(selectedOrder)}>
                      {t('order.payNow')}
                    </Button>
                  )}
                  <Button onClick={handleCloseDetail}>{t('common.close')}</Button>
                </Space>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderPage;
