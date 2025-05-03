import React, { useState } from 'react';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('en');

  const handleChange = (e) => {
    setLanguage(e.target.value);
    // Future implementation: Update app language using i18n or similar
    console.log(`Language changed to: ${e.target.value}`);
  };

  return (
    <div className="p-4">
      <label htmlFor="language" className="mr-2 text-sm font-medium text-gray-700">
        Language:
      </label>
      <select
        id="language"
        value={language}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="en">English</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
        <option value="zh">Chinese</option>
      </select>
    </div>
  );
};

export default LanguageSelector;