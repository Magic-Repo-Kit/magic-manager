import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import MrHeader from '@/components/mr-header';

function Admin() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();

  const hideHeader = location.pathname === '/admin/manage/chat';

  return (
    <div className={`admin-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`mr-header-box ${hideHeader ? 'isHide' : ''}`}>
        <MrHeader />
      </div>
      <main className={hideHeader ? 'isHide' : ''}>
        {/* 渲染子路由 */}
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
