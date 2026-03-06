import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, Result, Spin, Typography, Space, Divider, message } from 'antd';
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { updatePaymentStatus, updateOrderStatus } from '../store/slices/ordersSlice';
import { PaymentStatus, OrderStatus } from '../models/Order';
import './PaymentPage.css';

const { Title, Text, Paragraph } = Typography;

const PaymentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { orders } = useSelector((state) => state.orders);
  const order = orders.find((o) => o.id === orderId);

  const [paymentStatus, setPaymentStatus] = useState('processing'); // 'processing', 'success', 'failed'
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    if (!order) {
      message.error(t('error.notFound'));
      navigate('/orders');
      return;
    }

    // Simulate payment processing
    const timer = setTimeout(() => {
      // Simulate payment success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setPaymentStatus('success');
        dispatch(
          updatePaymentStatus({
            orderId: order.id,
            paymentStatus: PaymentStatus.COMPLETED,
          })
        );
        dispatch(
          updateOrderStatus({
            orderId: order.id,
            status: OrderStatus.PAID,
          })
        );
        message.success(t('order.paymentSuccess'));
      } else {
        setPaymentStatus('failed');
        dispatch(
          updatePaymentStatus({
            orderId: order.id,
            paymentStatus: PaymentStatus.FAILED,
          })
        );
        message.error(t('order.paymentFailed'));
      }

      setProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [order, orderId, dispatch, navigate, t]);

  if (!order) {
    return null;
  }

  const handleRetryPayment = () => {
    setProcessing(true);
    setPaymentStatus('processing');

    // Simulate retry
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setPaymentStatus('success');
        dispatch(
          updatePaymentStatus({
            orderId: order.id,
            paymentStatus: PaymentStatus.COMPLETED,
          })
        );
        dispatch(
          updateOrderStatus({
            orderId: order.id,
            status: OrderStatus.PAID,
          })
        );
        message.success(t('order.paymentSuccess'));
      } else {
        setPaymentStatus('failed');
        dispatch(
          updatePaymentStatus({
            orderId: order.id,
            paymentStatus: PaymentStatus.FAILED,
          })
        );
        message.error(t('order.paymentFailed'));
      }

      setProcessing(false);
    }, 2000);
  };

  const handleViewOrder = () => {
    navigate(`/orders/${order.id}`);
  };

  const handleBackToOrders = () => {
    navigate('/orders');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <Card className="payment-card">
          {processing && (
            <Result
              icon={<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
              title={t('order.processingPayment')}
              subTitle={t('order.pleaseWait')}
              extra={
                <div className="payment-info">
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                      <Text type="secondary">{t('order.orderNumber')}:</Text>
                      <br />
                      <Text strong>{order.id}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{t('order.paymentMethod')}:</Text>
                      <br />
                      <Text strong>{t(`order.${order.paymentMethod}`)}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{t('order.total')}:</Text>
                      <br />
                      <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
                        ¥{order.totalAmount.toFixed(2)}
                      </Title>
                    </div>
                  </Space>
                </div>
              }
            />
          )}

          {!processing && paymentStatus === 'success' && (
            <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title={t('order.paymentSuccess')}
              subTitle={
                <Space direction="vertical" size="small">
                  <Text>{t('order.paymentSuccessMessage')}</Text>
                  <Text type="secondary">
                    {t('order.orderNumber')}: {order.id}
                  </Text>
                </Space>
              }
              extra={
                <Space size="large">
                  <Button type="primary" size="large" onClick={handleViewOrder}>
                    {t('order.viewOrderDetail')}
                  </Button>
                  <Button size="large" onClick={handleBackToHome}>
                    {t('nav.home')}
                  </Button>
                </Space>
              }
            >
              <div className="payment-success-details">
                <Divider />
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.total')}:</Text>
                    <Text strong style={{ fontSize: '18px' }}>
                      ¥{order.totalAmount.toFixed(2)}
                    </Text>
                  </div>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.paymentMethod')}:</Text>
                    <Text>{t(`order.${order.paymentMethod}`)}</Text>
                  </div>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.status')}:</Text>
                    <Text type="success">{t('order.paid')}</Text>
                  </div>
                </Space>
              </div>
            </Result>
          )}

          {!processing && paymentStatus === 'failed' && (
            <Result
              status="error"
              icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              title={t('order.paymentFailed')}
              subTitle={
                <Space direction="vertical" size="small">
                  <Text>{t('order.paymentFailedMessage')}</Text>
                  <Text type="secondary">
                    {t('order.orderNumber')}: {order.id}
                  </Text>
                </Space>
              }
              extra={
                <Space size="large">
                  <Button type="primary" size="large" onClick={handleRetryPayment}>
                    {t('order.retryPayment')}
                  </Button>
                  <Button size="large" onClick={handleBackToOrders}>
                    {t('order.viewOrders')}
                  </Button>
                </Space>
              }
            >
              <div className="payment-failed-details">
                <Divider />
                <Paragraph type="secondary">{t('order.paymentFailedHint')}</Paragraph>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.total')}:</Text>
                    <Text strong style={{ fontSize: '18px' }}>
                      ¥{order.totalAmount.toFixed(2)}
                    </Text>
                  </div>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.paymentMethod')}:</Text>
                    <Text>{t(`order.${order.paymentMethod}`)}</Text>
                  </div>
                  <div className="detail-row">
                    <Text type="secondary">{t('order.status')}:</Text>
                    <Text type="warning">{t('order.pending')}</Text>
                  </div>
                </Space>
              </div>
            </Result>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
