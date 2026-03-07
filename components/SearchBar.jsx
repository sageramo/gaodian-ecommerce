import { useState, useEffect, useRef } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './SearchBar.css';

/**
 * SearchBar Component
 * Provides search input with real-time suggestions
 * 
 * Requirements: 6.1, 6.2
 */
const SearchBar = ({ onSearch, placeholder, className = '' }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimer = useRef(null);

  // Get all products for suggestions
  const products = useSelector((state) => state.products.items);

  // Get current language
  const currentLanguage = i18n.language;

  /**
   * Generate search suggestions based on input
   */
  const generateSuggestions = (keyword) => {
    if (!keyword || keyword.trim().length === 0) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    
    // Filter products that match the keyword
    const matchedProducts = products.filter((product) => {
      // Handle multi-language name object
      let nameZh = '';
      let nameEn = '';
      let nameJa = '';
      
      if (product.name && typeof product.name === 'object') {
        nameZh = product.name.zh?.toLowerCase() || '';
        nameEn = product.name.en?.toLowerCase() || '';
        nameJa = product.name.ja?.toLowerCase() || '';
      } else if (typeof product.name === 'string') {
        nameZh = product.name.toLowerCase();
      }
      
      // Handle legacy format
      if (product.nameEn) nameEn = product.nameEn.toLowerCase();
      if (product.nameJa) nameJa = product.nameJa.toLowerCase();
      
      // Handle description
      let descriptionText = '';
      if (product.description && typeof product.description === 'object') {
        descriptionText = (product.description.zh || product.description.en || '').toLowerCase();
      } else if (typeof product.description === 'string') {
        descriptionText = product.description.toLowerCase();
      }
      
      return (
        nameZh.includes(lowerKeyword) ||
        nameEn.includes(lowerKeyword) ||
        nameJa.includes(lowerKeyword) ||
        descriptionText.includes(lowerKeyword)
      );
    });

    // Limit to top 5 suggestions
    const topMatches = matchedProducts.slice(0, 5);

    // Format suggestions for AutoComplete
    const formattedSuggestions = topMatches.map((product) => {
      // Get product name based on current language
      let displayName = '';
      
      if (product.name && typeof product.name === 'object') {
        displayName = product.name[currentLanguage] || product.name.zh || product.name.en || '';
      } else if (typeof product.name === 'string') {
        displayName = product.name;
      }
      
      // Fallback to legacy format
      if (!displayName) {
        if (currentLanguage === 'en' && product.nameEn) {
          displayName = product.nameEn;
        } else if (currentLanguage === 'ja' && product.nameJa) {
          displayName = product.nameJa;
        } else {
          displayName = product.name || 'Unknown';
        }
      }

      return {
        value: displayName,
        label: (
          <div className="search-suggestion-item">
            <img 
              src={product.images[0]} 
              alt={displayName}
              className="suggestion-image"
            />
            <div className="suggestion-content">
              <div className="suggestion-name">{displayName}</div>
              <div className="suggestion-price">
                ¥{product.price.toFixed(2)}
              </div>
            </div>
          </div>
        ),
        productId: product.id,
      };
    });

    setSuggestions(formattedSuggestions);
    setIsOpen(formattedSuggestions.length > 0);
  };

  /**
   * Handle input change with debouncing
   */
  const handleInputChange = (value) => {
    setSearchValue(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      generateSuggestions(value);
    }, 300); // 300ms debounce
  };

  /**
   * Handle search submission
   */
  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      return;
    }

    // Close suggestions
    setIsOpen(false);

    // Call parent onSearch if provided
    if (onSearch) {
      onSearch(trimmedValue);
    } else {
      // Default behavior: navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(trimmedValue)}`);
    }

    // Clear search value
    setSearchValue('');
  };

  /**
   * Handle suggestion selection
   */
  const handleSelect = (value, option) => {
    if (option.productId) {
      // Navigate to product detail page
      navigate(`/products/${option.productId}`);
      setSearchValue('');
      setIsOpen(false);
    } else {
      // Treat as regular search
      handleSearch(value);
    }
  };

  /**
   * Cleanup timer on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className={`search-bar-container ${className}`}>
      <AutoComplete
        value={searchValue}
        options={suggestions}
        onChange={handleInputChange}
        onSelect={handleSelect}
        open={isOpen}
        onDropdownVisibleChange={setIsOpen}
        className="search-autocomplete"
        popupClassName="search-suggestions-popup"
        notFoundContent={null}
      >
        <Input
          placeholder={placeholder || t('search.placeholder')}
          prefix={<SearchOutlined />}
          onPressEnter={(e) => handleSearch(e.target.value)}
          allowClear
          size="large"
          className="search-input"
        />
      </AutoComplete>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchBar;