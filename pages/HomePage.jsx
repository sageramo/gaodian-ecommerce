import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Typography, Tabs, Button } from 'antd';
import { setProducts, setHeritageTypeFilter } from '../store/slices/productsSlice';
import ProductGrid from '../components/ProductGrid';
import { getAllProducts } from '../data/products';
import './HomePage.css';

const { Title, Paragraph } = Typography;

function HomePage() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get products from Redux store
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  // Load products from local data
  useEffect(() => {
    const allProducts = getAllProducts();
    dispatch(setProducts(allProducts));
  }, [dispatch]);

  // Filter products by category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    dispatch(setHeritageTypeFilter(category === 'all' ? null : category));
  };

  // Category tabs
  const categoryTabs = [
    {
      key: 'all',
      label: '全部',
    },
    {
      key: 'beijing-classic',
      label: '京式经典',
    },
    {
      key: 'festival-special',
      label: '节令糕点',
    },
    {
      key: 'gift-box',
      label: '礼盒装',
    },
    {
      key: 'daily-snack',
      label: '日常小吃',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Banner Carousel */}
      <section className="hero-section">
        <Carousel 
          autoplay 
          autoplaySpeed={4000} 
          effect="fade"
          dots={true}
          infinite={true}
        >
          <div className="carousel-slide">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                传统糕点 · 匠心传承
              </Title>
              <Paragraph className="carousel-description">
                精选优质食材，传承传统工艺，为您呈现地道的中式糕点
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                立即选购
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>
          <div className="carousel-slide carousel-slide-2">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                京八件 · 传统经典
              </Title>
              <Paragraph className="carousel-description">
                八种口味，精美礼盒，传承宫廷糕点工艺
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                查看详情
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>
          <div className="carousel-slide carousel-slide-3">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                驴打滚 · 艾窝窝 · 豌豆黄
              </Title>
              <Paragraph className="carousel-description">
                老北京传统小吃，匠心传承，地道风味
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                了解更多
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>
        </Carousel>
      </section>

      {/* Category Section */}
      <section className="category-section" id="products">
        <div className="section-header">
          <Title level={2}>糕点分类</Title>
          <Paragraph type="secondary">
            按糕点类型浏览我们的传统糕点
          </Paragraph>
        </div>
        
        <Tabs
          activeKey={activeCategory}
          onChange={handleCategoryChange}
          items={categoryTabs}
          centered
          size="large"
          className="category-tabs"
        />
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <ProductGrid 
          products={filteredProducts} 
          loading={loading}
          emptyText="没有找到相关商品"
        />
      </section>
    </div>
  );
}

export default HomePage;
