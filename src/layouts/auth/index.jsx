import React, { useState, useEffect, useContext } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
import BtnLogin from '@/components/BtnLogin';
import mrkLogo from '@/assets/images/logo-mrk.png';

function Login() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <img src={mrkLogo} alt="" className="mrkLogo" />
        <div className="btn-box">
          <DarkModeToggle size="20px" />
          <div className="space-line"></div>
          <BtnLogin iconName="mr-login-full" content="Login" />
        </div>
      </header>
      <main>内容</main>
      <section>1212</section>
    </div>
  );
}

export default Login;
