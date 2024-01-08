import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import './index.scss';

// 图片
import userHead from '@/assets/images/user-head.png';

function DropdownUser({ setUserOpen }) {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  // const navigate = useNavigate(); //路由

  return (
    <div className={`custom-dropdown-user ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <i
          className="iconfont mr-guanbi cursor-point"
          onClick={() => setUserOpen(false)}
        ></i>
      </header>
      <main>
        <div className="dropdown-main-top">
          <div className="dropdown-main-top-left">
            <div className="dropdown-main-introduce font-family-dingding">
              <div>Hi，谭智亮！</div>
              <div>这是你的个人名片。</div>
            </div>
            <div className="dropdown-main-timer">time</div>
          </div>

          <div className="dropdown-main-head">
            <img src={userHead} alt="" />
          </div>
        </div>
        <div>121</div>
      </main>
      <footer onClick={() => window.location.replace('/auth')}>
        <div className="space-line"></div>
        <div className="login-out-box user-select">
          <i className="iconfont mr-tuichu2 login-out"></i>
          <div className="login-text">退出登录</div>
        </div>
      </footer>
    </div>
  );
}

export default DropdownUser;
