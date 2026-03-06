import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Typography, Divider, Space, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function I18nDemo() {
  const { t, i18n } = useTranslation();

  const sections = [
    {
      title: 'Common',
      keys: ['loading', 'error', 'success', 'confirm', 'cancel', 'save', 'delete', 'edit'],
    },
    {
      title: 'Navigation',
      keys: ['home', 'products', 'cart', 'orders', 'heritage', 'login', 'register'],
      prefix: 'nav',
    },
    {
      title: 'Product',
      keys: ['name', 'price', 'stock', 'soldOut', 'addToCart', 'viewDetail'],
      prefix: 'product',
    },
    {
      title: 'Cart',
      keys: ['title', 'empty', 'continueShopping', 'quantity', 'total', 'checkout'],
      prefix: 'cart',
    },
    {
      title: 'Heritage',
      keys: ['title', 'mahjong', 'go', 'chess', 'dominoes', 'learnMore'],
      prefix: 'heritage',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>
        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '10px' }} />
        Internationalization Demo
      </Title>
      
      <Card style={{ marginBottom: '20px', background: '#f0f5ff' }}>
        <Space direction="vertical" size="small">
          <Text strong>Current Language: </Text>
          <Tag color="blue" style={{ fontSize: '16px', padding: '5px 15px' }}>
            {i18n.language === 'zh' && '🇨🇳 中文 (Chinese)'}
            {i18n.language === 'en' && '🇺🇸 English'}
            {i18n.language === 'ja' && '🇯🇵 日本語 (Japanese)'}
          </Tag>
          <Paragraph type="secondary" style={{ marginTop: '10px' }}>
            Use the language switcher in the header to change languages and see all text update in real-time.
          </Paragraph>
        </Space>
      </Card>

      <Title level={2}>Translation Examples</Title>
      <Paragraph>
        Below are examples of translated strings across different sections of the application:
      </Paragraph>

      <Row gutter={[16, 16]}>
        {sections.map((section) => (
          <Col xs={24} md={12} key={section.title}>
            <Card title={section.title} hoverable>
              <Space direction="vertical" style={{ width: '100%' }}>
                {section.keys.map((key) => {
                  const translationKey = section.prefix ? `${section.prefix}.${key}` : `common.${key}`;
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">{key}:</Text>
                      <Text strong>{t(translationKey)}</Text>
                    </div>
                  );
                })}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Card title="Features Implemented" style={{ marginTop: '20px' }}>
        <Space direction="vertical" size="middle">
          <div>
            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            <Text strong>Automatic Browser Language Detection</Text>
            <Paragraph type="secondary" style={{ marginLeft: '24px' }}>
              The app automatically detects your browser language on first visit
            </Paragraph>
          </div>
          <div>
            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            <Text strong>Language Preference Persistence</Text>
            <Paragraph type="secondary" style={{ marginLeft: '24px' }}>
              Your language choice is saved to localStorage and persists across sessions
            </Paragraph>
          </div>
          <div>
            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            <Text strong>Real-time Language Switching</Text>
            <Paragraph type="secondary" style={{ marginLeft: '24px' }}>
              All UI text updates immediately when you change languages
            </Paragraph>
          </div>
          <div>
            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            <Text strong>Comprehensive Translation Coverage</Text>
            <Paragraph type="secondary" style={{ marginLeft: '24px' }}>
              Over 100+ translation keys covering all major UI sections
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default I18nDemo;
