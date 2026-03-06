import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ width: 140 }}
      suffixIcon={<GlobalOutlined />}
      data-testid="language-switcher"
    >
      {languages.map((lang) => (
        <Option key={lang.code} value={lang.code} data-testid={`language-option-${lang.code}`}>
          <span style={{ marginRight: 8 }}>{lang.flag}</span>
          {lang.label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
