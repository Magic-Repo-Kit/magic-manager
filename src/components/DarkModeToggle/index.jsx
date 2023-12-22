import React, { useContext } from 'react';
import { DarkModeContext } from '@/components/DarkModeProvider';

const DarkModeToggle = ({ size }) => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <i
        className="iconfont mr-evening-moon2"
        onClick={toggleDarkMode}
        style={{ cursor: 'pointer', fontSize: size }}
      ></i>
    </>
  );
};

export default DarkModeToggle;
