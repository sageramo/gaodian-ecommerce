import { useState, useEffect } from 'react';
import { Card, Radio, Checkbox, Slider, Button, Divider, Space } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHeritageTypeFilter,
  setPriceRangeFilter,
  setInStockOnlyFilter,
  clearFilters,
} from '../store/slices/productsSlice';
import { HeritageType } from '../models/Product';
import './FilterSidebar.css';

/**
 * FilterSidebar Component
 * Provides filtering options for products
 * 
 * Requirements: 6.3, 6.4
 */
const FilterSidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get current filters from Redux
  const filters = useSelector((state) => state.products.filters);
  const products = useSelector((state) => state.products.items);

  // Local state for price range slider
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Calculate min and max prices from products
  const { minPrice, maxPrice } = products.reduce(
    (acc, product) => ({
      minPrice: Math.min(acc.minPrice, product.price),
      maxPrice: Math.max(acc.maxPrice, product.price),
    }),
    { minPrice: 0, maxPrice: 500 }
  );

  // Initialize price range based on products
  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([
        Math.floor(minPrice),
        Math.ceil(maxPrice),
      ]);
    }
  }, [minPrice, maxPrice, products.length]);

  // Sync local price range with Redux filters
  useEffect(() => {
    if (filters.priceRange) {
      setPriceRange([
        filters.priceRange.min || Math.floor(minPrice),
        filters.priceRange.max === Infinity ? Math.ceil(maxPrice) : filters.priceRange.max,
      ]);
    }
  }, [filters.priceRange, minPrice, maxPrice]);

  /**
   * Handle category filter change (产品分类过滤)
   */
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    dispatch(setHeritageTypeFilter(value === 'all' ? null : value));
  };

  /**
   * Handle price range change
   */
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  /**
   * Handle price range change complete (after user releases slider)
   */
  const handlePriceRangeChangeComplete = (value) => {
    dispatch(setPriceRangeFilter({
      min: value[0],
      max: value[1],
    }));
  };

  /**
   * Handle in stock filter change
   */
  const handleInStockChange = (e) => {
    dispatch(setInStockOnlyFilter(e.target.checked));
  };

  /**
   * Handle clear all filters
   */
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
  };

  // Heritage type options - 更新为产品分类
  const categoryOptions = [
    { label: t('filter.all'), value: 'all' },
    { label: t('pastry.coreClassic'), value: 'core-classic' },
    { label: t('pastry.festivalLimited'), value: 'festival-limited' },
    { label: t('pastry.southeastAsia'), value: 'southeast-asia' },
  ];

  // Check if any filters are active
  const hasActiveFilters =
    filters.category !== null ||
    filters.priceRange.min !== 0 ||
    filters.priceRange.max !== Infinity ||
    filters.inStockOnly;

  return (
    <div className="filter-sidebar">
      <Card
        title={
          <Space>
            <FilterOutlined />
            <span>{t('filter.title')}</span>
          </Space>
        }
        extra={
          hasActiveFilters && (
            <Button
              type="link"
              size="small"
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
            >
              {t('filter.reset')}
            </Button>
          )
        }
        className="filter-card"
      >
        {/* Category Filter - 产品分类过滤 */}
        <div className="filter-section">
          <h4 className="filter-section-title">{t('product.category')}</h4>
          <Radio.Group
            value={filters.category || 'all'}
            onChange={handleCategoryChange}
            className="filter-radio-group"
          >
            <Space direction="vertical">
              {categoryOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>

        <Divider />

        {/* Price Range Filter */}
        <div className="filter-section">
          <h4 className="filter-section-title">{t('filter.priceRange')}</h4>
          <div className="price-range-display">
            <span className="price-value">¥{priceRange[0]}</span>
            <span className="price-separator">-</span>
            <span className="price-value">¥{priceRange[1]}</span>
          </div>
          <Slider
            range
            min={Math.floor(minPrice)}
            max={Math.ceil(maxPrice)}
            value={priceRange}
            onChange={handlePriceRangeChange}
            onAfterChange={handlePriceRangeChangeComplete}
            tooltip={{
              formatter: (value) => `¥${value}`,
            }}
            className="price-slider"
          />
        </div>

        <Divider />

        {/* Stock Filter */}
        <div className="filter-section">
          <Checkbox
            checked={filters.inStockOnly}
            onChange={handleInStockChange}
          >
            {t('filter.inStock')}
          </Checkbox>
        </div>
      </Card>

      {/* Mobile Apply Button */}
      <div className="filter-mobile-actions">
        <Button
          type="primary"
          block
          size="large"
          onClick={() => {
            // Close mobile filter drawer (will be handled by parent)
            const event = new CustomEvent('closeFilterDrawer');
            window.dispatchEvent(event);
          }}
        >
          {t('filter.apply')}
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
