import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import './index.scss';

function DropdownApps({ selectedAppName, setSelectedAppName }) {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const handleAppClick = (name, app) => {
    setSelectedAppName(name);
    localStorage.setItem('selectedAppName', name);
    localStorage.setItem('selectedApp', app);
    navigate(`${app}`);
  };

  return (
    <div className={`custom-dropdown-app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dropdown-list">
        <div className="dropdown-list-allapps">
          <span>All Apps</span>
          <i className="iconfont mr-home-3"></i>
        </div>
        <div
          className={`flx-justify-between ${
            selectedAppName === 'GPT' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('GPT', 'gpt')}
        >
          <span>GPT</span>
          <i className="iconfont mr-ziyuan49"></i>
        </div>
        <div
          className={`flx-justify-between ${
            selectedAppName === '聊天室' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('聊天室', 'chat')}
        >
          <div>
            <span>聊天室</span>
            <i className="dropdown-list-new-icon iconfont mr-newchunse"></i>
          </div>
          <i className="iconfont mr-chat"></i>
        </div>
        <div
          className={`flx-justify-between ${
            selectedAppName === '百宝袋' ? 'active' : ''
          }`}
          onClick={() => handleAppClick('百宝袋', 'manage')}
        >
          <span>百宝袋</span>
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
