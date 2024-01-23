import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import Create from './children/create';
import Preview from './children/preview';

// antd组件
import { Button } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const [isChange, setIsChange] = useState(false);

  return (
    <>
      {/* PC端 */}
      <div
        className={`create-preview-container create-preview-pc ${
          darkMode ? 'dark-mode' : ''
        }`}
      >
        <div className="create-preview-item">
          <Create />
        </div>
        <div className="preview-container-box create-preview-item">
          <Preview />
        </div>
      </div>
      {/* 移动端 */}
      <div
        className={`create-preview-container create-preview-app ${
          darkMode ? 'dark-mode' : ''
        }`}
      >
        <div className="create-preview-change-icon flx-center">
          <Button
            type="primary"
            size="small"
            onClick={() => setIsChange(!isChange)}
          >
            切换{isChange ? '创建' : '预览'}
          </Button>
        </div>
        {/* 创建/预览 */}
        {isChange ? (
          <div className="preview-container-box create-preview-item">
            <Preview />
          </div>
        ) : (
          <div className="create-preview-item">
            <Create />
          </div>
        )}

        {/* 移动端 */}
      </div>
    </>
  );
}

export default CreatePreview;
