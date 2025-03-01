import React from 'react';
import { Moon, Sun } from 'lucide-react';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="flex justify-end mb-12">
      <div className="flex items-center gap-2">
        <Sun className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-yellow-500'} transition-colors duration-300`} />
        <button
          onClick={toggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-purple-600' : 'bg-gray-200'} transition-colors duration-300`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        <Moon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-400'} transition-colors duration-300`} />
      </div>
    </div>
  );
}

export default Header;
