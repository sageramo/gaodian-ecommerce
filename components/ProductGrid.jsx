import { Row, Col, Empty, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import './ProductGrid.css';

/**
 * ProductGrid component - displays products in a responsive grid layout
 * @param {Object} props
 * @param {Array} props.products - Array of product objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.emptyText - Text to display when no products
 */
function ProductGrid({ products = [], loading = false, emptyText }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="product-grid-loading">
        <Spin size="large" tip={String(t('common.loading') || 'Loading...')} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <Empty
          description={emptyText || t('search.noResults')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="product-grid">
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            xxl={6}
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductGrid;
