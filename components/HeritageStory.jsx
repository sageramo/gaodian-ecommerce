import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Button, Space } from 'antd';
import { HeritageType } from '../models/Product';
import './HeritageStory.css';

const { Paragraph } = Typography;

/**
 * HeritageStory Component
 * Displays heritage story content with clickable tags to navigate to heritage page
 * 
 * @param {Object} props
 * @param {string} props.heritageType - Heritage type (mahjong, go, chess, dominoes)
 * @param {string} props.story - Heritage story text in current language
 * @param {boolean} props.showTag - Whether to show heritage type tag (default: true)
 * @param {string} props.className - Additional CSS class
 */
function HeritageStory({ heritageType, story, showTag = true, className = '' }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get heritage label
  const getHeritageLabel = () => {
    const heritageMap = {
      [HeritageType.MAHJONG]: t('heritage.mahjong'),
      [HeritageType.GO]: t('heritage.go'),
      [HeritageType.CHESS]: t('heritage.chess'),
      [HeritageType.DOMINOES]: t('heritage.dominoes'),
      [HeritageType.OTHER]: t('filter.all'),
    };
    return heritageMap[heritageType] || heritageType;
  };

  // Get heritage tag color
  const getHeritageColor = () => {
    const colorMap = {
      [HeritageType.MAHJONG]: 'blue',
      [HeritageType.GO]: 'green',
      [HeritageType.CHESS]: 'red',
      [HeritageType.DOMINOES]: 'orange',
      [HeritageType.OTHER]: 'default',
    };
    return colorMap[heritageType] || 'default';
  };

  // Handle tag click - navigate to heritage page
  const handleTagClick = () => {
    navigate('/heritage');
  };

  // Handle learn more button click
  const handleLearnMore = () => {
    navigate('/heritage');
  };

  return (
    <Card className={`heritage-story-component ${className}`}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {showTag && (
          <div className="heritage-story-header">
            <Tag
              color={getHeritageColor()}
              className="heritage-story-tag"
              onClick={handleTagClick}
              style={{ cursor: 'pointer' }}
            >
              {getHeritageLabel()}
            </Tag>
          </div>
        )}

        <Paragraph className="heritage-story-content">
          {story}
        </Paragraph>

        <div className="heritage-story-footer">
          <Button type="link" onClick={handleLearnMore} className="learn-more-button">
            {t('heritage.learnMore')} →
          </Button>
        </div>
      </Space>
    </Card>
  );
}

HeritageStory.propTypes = {
  heritageType: PropTypes.oneOf(Object.values(HeritageType)).isRequired,
  story: PropTypes.string.isRequired,
  showTag: PropTypes.bool,
  className: PropTypes.string,
};

export default HeritageStory;
