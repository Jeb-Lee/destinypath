import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('cosmic'); // 'cosmic' or 'earthly'

  // Check server connection on mount
  useEffect(() => {
    const checkServerHealth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (!response.ok) {
          throw new Error('Server not responding');
        }
      } catch (err) {
        setError(`Backend connection error: ${err.message}. Make sure the server is running.`);
      } finally {
        setIsLoading(false);
      }
    };

    checkServerHealth();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'cosmic' ? 'earthly' : 'cosmic');
  };

  const themeClasses = {
    cosmic: 'bg-gradient-to-br from-purple-900 to-indigo-800',
    earthly: 'bg-gradient-to-br from-green-900 to-emerald-800'
  };

  const themeText = {
    cosmic: 'text-white',
    earthly: 'text-emerald-100'
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className={`app-container min-h-screen ${themeClasses[theme]} flex flex-col items-center justify-center p-4 transition-colors duration-500`}>
      <button 
        onClick={toggleTheme}
        className={`absolute top-4 right-4 px-4 py-2 rounded-full ${theme === 'cosmic' ? 'bg-indigo-700' : 'bg-emerald-700'} ${themeText[theme]} shadow-lg hover:opacity-90 transition-all`}
      >
        {theme === 'cosmic' ? '🌌 Cosmic' : '🌍 Earthly'}
      </button>

      <header className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold ${themeText[theme]} mb-2`}>
          Destiny Path
        </h1>
        <p className={`text-lg ${theme === 'cosmic' ? 'text-gray-200' : 'text-emerald-200'} mt-2`}>
          Discover your cosmic blueprint
        </p>
      </header>

      <div className="w-full max-w-4xl">
        <Calculator theme={theme} />
      </div>

      <footer className={`mt-8 text-center ${themeText[theme]} opacity-80 text-sm`}>
        <p>© {new Date().getFullYear()} Destiny Path Astrology</p>
        <p className="mt-1">All readings are for entertainment purposes only</p>
      </footer>
    </div>
  );
};

export default App;