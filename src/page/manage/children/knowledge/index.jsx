import React, { useContext } from 'react';
import './index.scss';
import { Outlet } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

function Knowledge() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`knowledge-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* 渲染子路由 */}
      <Outlet />
    </div>
  );
}

export default Knowledge;
