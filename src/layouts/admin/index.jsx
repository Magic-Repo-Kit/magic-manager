import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import MrHeader from '@/components/mr-header';

function Admin() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  return (
    <div className={`admin-container ${darkMode ? 'dark-mode' : ''}`}>
      <MrHeader />
      <main>
        {/* 渲染子路由 */}
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
