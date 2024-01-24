import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import Preview from './children/preview';

// antd组件
import { Button } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`create-preview-container ${darkMode ? 'dark-mode' : ''}`}>
      <Preview />
    </div>
  );
}

export default CreatePreview;
