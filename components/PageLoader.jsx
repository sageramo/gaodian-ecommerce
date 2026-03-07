import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './PageLoader.css';

/**
 * PageLoader component - displays a loading spinner for lazy-loaded pages
 * Provides a better user experience during code splitting
 */
function PageLoader() {
  return (
    <div className="page-loader">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        tip="Loading..."
        size="large"
      />
    </div>
  );
}

export default PageLoader;
