import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '@/components/DarkModeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
import './index.scss';

function Login() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`login-container ${darkMode ? 'dark-mode' : ''} flx-center`}
    >
      <div>1212</div>

      <DarkModeToggle size="20px" />
    </div>
  );
}

export default Login;
