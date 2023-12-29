import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //渲染子路由

import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
import BtnLogin from '@/components/BtnLogin';

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
function Admin() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`admin-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-content">
          <div className="mrk-logo">
            <img src={mrkLogo} alt="" className="mrkLogo" />
            <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
          </div>

          <div className="btn-box">
            <DarkModeToggle size="20px" />
            <div className="space-line"></div>
            <div>
              <BtnLogin iconName="mr-admin-full" content="Login" />
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* 渲染子路由 */}
        {/* <Outlet /> */}
      </main>
    </div>
  );
}

export default Admin;
