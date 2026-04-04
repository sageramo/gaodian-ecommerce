import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import './Layout.css';

const { Content, Footer } = AntLayout;

const Layout = () => {
  const { t } = useTranslation();

  return (
    <AntLayout className="layout-container">
      <Header />
      <Content className="layout-main">
        <Outlet />
      </Content>
      <Footer className="layout-footer">
        <div className="footer-content">
          <div className="footer-text">
            <span className="brand-name brand-name--on-dark">糕点情报局</span>
            {' '}
            ©2024 - {t('heritage.title')}
          </div>
          <div className="footer-links">
            <a href="/heritage">{t('nav.heritage')}</a>
            <span className="footer-divider">|</span>
            <a href="/about">{t('common.about')}</a>
            <span className="footer-divider">|</span>
            <a href="/contact">{t('common.contact')}</a>
          </div>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
