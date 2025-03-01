import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState('https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-light_rfwg6f.svg');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      setBgImage('https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-dark_ogqm8s.svg');
    } else {
      document.body.classList.remove('dark-mode');
      setBgImage('https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-light_rfwg6f.svg');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out bg-cover bg-center bg-no-repeat`}
      style={{ 
        backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
        backgroundImage: `url(${bgImage})`,
        transition: 'background-color 0.3s ease-in-out, background-image 0.3s ease-in-out'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}

export default App;