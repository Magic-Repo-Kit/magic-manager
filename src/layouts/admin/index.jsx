import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //渲染子路由

import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
import HeaderTabs from './header-tabs';

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
          {/* 中间 */}
          <div className="user-select">
            <HeaderTabs />
          </div>
          {/* 右侧 */}
          <div className="btn-box">
            <DarkModeToggle size="20px" />
            <div className="admin-language-switch flx-center">
              <i className="iconfont mr-qiehuanyuyan"></i>
            </div>
            <div className="space-line"></div>
            <div className="admin-user-container">
              <i className="iconfont mr-user--line"></i>
            </div>
            {/* <div>
              <i
                onClick={() => {
                  window.location.href = '/auth';
                }}
                className="iconfont mr-tuichu"
                style={{
                  color: '#d81e06',
                  marginRight: '8px',
                  fontSize: '18px',
                  marginLeft: '10px',
                }}
              ></i>
            </div> */}
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
