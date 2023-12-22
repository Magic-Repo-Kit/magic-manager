import React, { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  // 监听 darkMode 变化，并将其存储到本地
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
