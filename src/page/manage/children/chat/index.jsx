import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ChatCtx from './children/chat-ctx';

// antd组件
import { Button } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [isNavHidden, setIsNavHidden] = useState(false);
  return (
    <div className={`chat-container-box ${darkMode ? 'dark-mode' : ''}`}>
      <ChatCtx />
      {/* 侧边栏 */}

      <nav className={`chat-container-nav ${isNavHidden ? 'hidden' : ''}`}>
        <div>添加</div>
      </nav>
    </div>
  );
}

export default CreatePreview;
