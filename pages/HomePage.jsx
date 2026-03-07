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

  // Category tabs - 更新为新的产品分类
  const categoryTabs = [
    {
      key: 'all',
      label: '全部',
    },
    {
      key: 'core-classic',
      label: '核心经典系列',
    },
    {
      key: 'festival-limited',
      label: '节庆限定系列',
    },
    {
      key: 'southeast-asia',
      label: '东南亚风味系列',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Banner Carousel */}
      <section className="hero-section">
        <Carousel 
          autoplay 
          autoplaySpeed={5000} 
          effect="fade"
          dots={true}
          infinite={true}
          arrows={true}
        >
          {/* 糕 - 承袭千年糕点制作技艺 */}
          <div className="carousel-slide carousel-slide-gao">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                糕 · 匠心传承
              </Title>
              <Paragraph className="carousel-description">
                承袭千年糕点制作技艺，以天然食材、手工匠心<br />
                呈现可品味的东方滋味
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                立即选购
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>

          {/* 梁 - 桥梁连接中国与世界 */}
          <div className="carousel-slide carousel-slide-liang">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                梁 · 文化桥梁
              </Title>
              <Paragraph className="carousel-description">
                既指"桥梁"——连接中国与世界、传统与现代、文化与生活<br />
                亦指"栋梁"——承载中华优秀传统文化的核心精神
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                了解更多
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>

          {/* 锦 - 传统丝织工艺包裹 */}
          <div className="carousel-slide carousel-slide-jin">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                锦 · 精美包装
              </Title>
              <Paragraph className="carousel-description">
                以云锦、宋锦、蜀锦等中国传统丝织工艺<br />
                包裹匠心之作
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                查看礼盒
              </Button>
            </div>
            <div className="carousel-image-overlay" />
          </div>

          {/* 绣 - 非遗技艺的细腻与温度 */}
          <div className="carousel-slide carousel-slide-xiu">
            <div className="carousel-content">
              <Title level={1} className="carousel-title">
                绣 · 匠心工艺
              </Title>
              <Paragraph className="carousel-description">
                以匠心为针、以时间为线<br />
                在方寸之间"绣"出非遗技艺的细腻与温度
              </Paragraph>
              <Button type="primary" size="large" href="#products">
                探索工艺
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
