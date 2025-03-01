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
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out ${
        darkMode
          ? 'bg-slate-800 bg-[url("/assets/bg-dark.svg")]'
          : 'bg-slate-50 bg-[url("/assets/bg-light.svg")]'
      } bg-cover bg-center bg-no-repeat transition-all`}
    >
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
</div>
    </div>
  );
}

export default App;
