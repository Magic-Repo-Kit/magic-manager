import React, { useContext } from 'react';
import { DarkModeContext } from '@/components/DarkModeProvider';
import './index.scss';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <label className="switch-dark-mode">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default DarkModeToggle;
