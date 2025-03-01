import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
              Welcome to the
            </h1>
            <h1 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
              Frontend Quiz!
            </h1>
            <p className={`text-xl italic ${darkMode ? 'text-gray-300' : 'text-slate-600'} transition-colors duration-300`}>
              Pick a subject to get started!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
