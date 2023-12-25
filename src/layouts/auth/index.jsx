import React, { useState, useEffect, useContext } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
import BtnLogin from '@/components/BtnLogin';

import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
import loginMain from '@/assets/images/login-main.png';

function Login() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="mrk-logo">
          <img src={mrkLogo} alt="" className="mrkLogo" />
          <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
        </div>

        <div className="btn-box">
          <DarkModeToggle size="20px" />
          <div className="space-line"></div>
          <BtnLogin iconName="mr-login-full" content="Login" />
        </div>
      </header>
      <main>
        <section>
          <div className="login-main-explain">
            <div>MagicRepokit</div>
            <div>下一个面向AI的工具百宝袋</div>

            <div class="explain-btn">快速体验</div>
          </div>
        </section>
        <section>
          <div className="login-main-box">
            <div className="loginMain">
              <img src={loginMain} className="float-up-down " />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
