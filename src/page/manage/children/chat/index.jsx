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

  return (
    <div className={`chat-container-box ${darkMode ? 'dark-mode' : ''}`}>
      <ChatCtx />
    </div>
  );
}

export default CreatePreview;
