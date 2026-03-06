import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Drawer, Empty, Typography, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { setSearchKeyword, clearFilters } from '../store/slices/productsSlice';
import { selectFilteredProducts } from '../store/selectors';
import './ProductListPage.css';

const { Title, Paragraph } = Typography;

/**
 * ProductListPage Component
 * Displays product list with search and filter functionality
 * 
 * Requirements: 6.2, 6.5
 */
function ProductListPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Get search keyword from URL
  const searchKeyword = searchParams.get('search') || '';

  // Get filtered products from Redux
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector((state) => state.products.loading);
  const filters = useSelector((state) => state.products.filters);

  // Update search keyword in Redux when URL changes
  useEffect(() => {
    dispatch(setSearchKeyword(searchKeyword));
  }, [searchKeyword, dispatch]);

  // Listen for close filter drawer event (from FilterSidebar mobile apply button)
  useEffect(() => {
    const handleCloseDrawer = () => {
      setFilterDrawerOpen(false);
    };

    window.addEventListener('closeFilterDrawer', handleCloseDrawer);
    return () => {
      window.removeEventListener('closeFilterDrawer', handleCloseDrawer);
    };
  }, []);

  /**
   * Handle clear all filters
   */
  const handleClearFilters = () => {
    dispatch(clearFilters());
    // Keep search keyword if it exists
    if (searchKeyword) {
      dispatch(setSearchKeyword(searchKeyword));
    }
  };

  /**
   * Get popular/recommended products (mock data)
   */
  const getRecommendedProducts = () => {
    const allProducts = useSelector((state) => state.products.items);
    // Return products with stock > 0, sorted by price (descending)
    return allProducts
      .filter((p) => p.stock > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 6);
  };

  const recommendedProducts = getRecommendedProducts();

  // Check if any filters are active
  const hasActiveFilters =
    filters.heritageType !== null ||
    filters.priceRange.min !== 0 ||
    filters.priceRange.max !== Infinity ||
    filters.inStockOnly;

  // Determine if we should show "no results" state
  const showNoResults = !loading && filteredProducts.length === 0;

  return (
    <div className="product-list-page">
      <div className="product-list-container">
        <Row gutter={[24, 24]}>
          {/* Desktop Filter Sidebar */}
          <Col xs={0} md={6} lg={5}>
            <FilterSidebar />
          </Col>

          {/* Product List Content */}
          <Col xs={24} md={18} lg={19}>
            {/* Page Header */}
            <div className="product-list-header">
              <div className="header-content">
                <Title level={2} className="page-title">
                  {searchKeyword
                    ? t('search.results', `搜索结果: "${searchKeyword}"`)
                    : t('nav.products')}
                </Title>
                <Paragraph type="secondary" className="results-count">
                  {t('product.found', `找到 ${filteredProducts.length} 件商品`)}
                </Paragraph>
              </div>

              {/* Mobile Filter Button */}
              <Button
                className="mobile-filter-button"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerOpen(true)}
              >
                {t('filter.title')}
              </Button>
            </div>

            {/* Active Filters Display */}
            {(searchKeyword || hasActiveFilters) && (
              <div className="active-filters">
                <Space wrap>
                  {searchKeyword && (
                    <span className="filter-tag">
                      {t('search.keyword')}: {searchKeyword}
                    </span>
                  )}
                  {hasActiveFilters && (
                    <Button
                      type="link"
                      size="small"
                      onClick={handleClearFilters}
                    >
                      {t('filter.reset')}
                    </Button>
                  )}
                </Space>
              </div>
            )}

            {/* Product Grid */}
            {showNoResults ? (
              <div className="no-results-container">
                <Empty
                  description={
                    <div className="no-results-content">
                      <Title level={4}>{t('search.noResults')}</Title>
                      <Paragraph type="secondary">
                        {searchKeyword
                          ? t('search.tryDifferent', '尝试使用不同的关键词或筛选条件')
                          : t('search.noProductsMatch', '没有商品符合当前筛选条件')}
                      </Paragraph>
                    </div>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                  <div className="recommended-section">
                    <Title level={4} className="recommended-title">
                      {t('product.recommended', '热门推荐')}
                    </Title>
                    <ProductGrid
                      products={recommendedProducts}
                      loading={false}
                    />
                    <div className="view-all-button-container">
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          dispatch(clearFilters());
                          navigate('/products');
                        }}
                      >
                        {t('product.viewAll', '查看全部商品')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                emptyText={t('search.noResults')}
              />
            )}
          </Col>
        </Row>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        title={t('filter.title')}
        placement="left"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width="80%"
        className="filter-drawer"
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

export default ProductListPage;
