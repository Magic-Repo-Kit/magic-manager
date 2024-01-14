import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import './index.scss';

// antd组件
import { Tooltip } from 'antd';

function DropdownApps({ selectedAppName, setSelectedAppName }) {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const handleAppClick = (name, app) => {
    setSelectedAppName(name);
    sessionStorage.setItem('selectedAppName', name);
    sessionStorage.setItem('selectedApp', app);
    navigate(`${app}`);
  };

  return (
    <div className={`custom-dropdown-app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dropdown-list">
        <div className="dropdown-list-allapps">
          <span>All Apps</span>
          <i className="iconfont mr-home-3"></i>
        </div>
        {/* Item - 一问一答 */}
        <div
          className={`flx-justify-between ${
            selectedAppName === '一问一答' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('一问一答', 'gpt')}
        >
          <span>一问一答</span>
          <i className="iconfont mr-ziyuan49"></i>
        </div>
        {/* Item - AI助手 */}
        <div
          className={`flx-justify-between ${
            selectedAppName === 'AI助手' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('AI助手', 'ai-helper')}
        >
          <span>AI助手</span>
          <i className="iconfont mr-service_ChatGPT"></i>
        </div>
        {/* Item - 闪聊 */}
        <div
          className={`flx-justify-between ${
            selectedAppName === '闪聊' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('闪聊', 'chat')}
        >
          <div>
            <span>闪聊</span>
            <i className="dropdown-list-new-icon iconfont mr-newchunse"></i>
          </div>
          <i className="iconfont mr-chat"></i>
        </div>

        {/* Item - AI绘图 */}
        <Tooltip
          title="内测中，还未开放嘞"
          arrow={false}
          color={'rgba(25, 25, 25, 0.8)'}
        >
          <div
            className={`flx-justify-between ${
              selectedAppName === 'AI绘图' ? 'active' : ''
            }`}
          >
            <div>
              <span>AI绘图</span>
            </div>
            <i className="iconfont mr-sheji_huatu"></i>
          </div>
        </Tooltip>
        {/* Item - 频道 */}
        <Tooltip
          title="内测中，还未开放嘞"
          arrow={false}
          color={'rgba(25, 25, 25, 0.8)'}
        >
          <div
            className={`flx-justify-between ${
              selectedAppName === '频道' ? 'active' : ''
            }`}
          >
            <div>
              <span>频道</span>
            </div>
            <i className="iconfont mr-record-sound"></i>
          </div>
        </Tooltip>

        {/* Item - 工作台 */}
        <div
          className={`flx-justify-between ${
            selectedAppName === '工作台' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('工作台', 'manage')}
        >
          <span>工作台</span>
          <i className="iconfont mr-1huojian"></i>
        </div>
      </div>

      <div className="dropdown-right flx-center">
        <i className="icon-github iconfont mr-github"></i>
        <div className="dropdown-right-title font-family-dingding">
          MagicRepoKit
        </div>
        <div>愿我有所发现，有所创造。</div>
        <div className="dropdown-right-btn font-family-dingding user-select">
          <i className="iconfont mr-star01"></i>
          <span>Star on GitHub</span>
        </div>
        <div>您的星是对我们最大的鼓励！</div>
      </div>
    </div>
  );
}

export default DropdownApps;
