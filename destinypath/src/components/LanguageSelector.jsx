import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="en">English</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  );
};

export default LanguageSelector;