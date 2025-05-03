import React, { useState } from 'react';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Destiny Path</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <main className="container mx-auto p-4">
        <Calculator />
      </main>
    </div>
  );
}

export default App;