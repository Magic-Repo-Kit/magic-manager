import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import './index.scss';

function DropdownUser({ setUserOpen }) {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  return (
    <div className={`custom-dropdown-user ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <i
          className="iconfont mr-guanbi"
          onClick={() => setUserOpen(false)}
        ></i>
      </header>
      <main>
        <div>121</div>
        <div>121</div>
      </main>
      <footer onClick={() => window.location.replace('/auth')}>
        <div>
          <i className="iconfont mr-daoru"></i>
          <span>退出登录</span>
        </div>
      </footer>
    </div>
  );
}

export default DropdownUser;
