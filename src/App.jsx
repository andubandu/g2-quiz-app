import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import quizData from './data/quizData.json';

const darkICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-dark_ogqm8s.svg';
const lightICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-light_rfwg6f.svg';
const lightICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903938/pattern-background-mobile-light_dr2nzs.svg';
const darkICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903928/pattern-background-mobile-dark_pxpjye.svg';
const darkICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903949/pattern-background-tablet-dark_yshmyc.svg';
const lightICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903958/pattern-background-tablet-light_dlgvg6.svg';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState(lightICON);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const updateBgImage = () => {
      const width = window.innerWidth;
      if (darkMode) {
        document.body.classList.add('dark-mode');
        if (width < 768) {
          setBgImage(darkICON_mobile);
        } else if (width < 1024) {
          setBgImage(darkICON_tablet);
        } else {
          setBgImage(darkICON);
        }
      } else {
        document.body.classList.remove('dark-mode');
        if (width < 768) {
          setBgImage(lightICON_mobile);
        } else if (width < 1024) {
          setBgImage(lightICON_tablet);
        } else {
          setBgImage(lightICON);
        }
      }
    };

    updateBgImage();
    window.addEventListener('resize', updateBgImage);

    return () => {
      window.removeEventListener('resize', updateBgImage);
    };
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="md:w-1/2 px-4 md:px-0">
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
              Welcome to the
            </h1>
            <h1 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
              Frontend Quiz!
            </h1>
            <p className={`text-xl italic ${darkMode ? 'text-gray-300' : 'text-slate-600'} transition-colors duration-300`}>
              Pick a subject to get started.
            </p>
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;