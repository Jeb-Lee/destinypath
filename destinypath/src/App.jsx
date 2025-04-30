import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{t('app_title')}</h1>
        <p className="text-lg text-gray-200 mt-2">{t('app_subtitle')}</p>
      </header>
      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default App;