import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ajax from '@/request';

// antd组件
import { Breadcrumb } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`create-preview-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="create-container create-preview-item">
        <div>
          <div>在下方提示词框中输入任意内容，即可让AI辅助生成提示词</div>
        </div>
        <div>
          <div>角色头像</div>
          <div>角色名称</div>
        </div>
        <div>
          <div>高级功能</div>
          <div>发散能力</div>
          <div>模型选择</div>
          <div>知识库</div>
          <div>预设对话</div>
        </div>
        <footer>创建角色</footer>
      </div>
      <div className="preview-container create-preview-item">232323</div>
    </div>
  );
}

export default CreatePreview;
