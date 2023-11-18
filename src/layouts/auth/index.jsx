import React, { useState, useEffect } from 'react';
import LoginForm from './loginForm';
import LoginFormPhone from './loginForm/form-phone';
import MrFooter from '@/components/mr-footer';
import './index.scss';
import mrkLogo from '@/assets/images/mrk-dark.png';
import loginBc1 from '@/assets/images/login-vr.svg';
import { handleFullScreenClick } from '@/utils/tools';

import { Layout, Tooltip } from 'antd';
const { Header, Footer } = Layout;

function Login() {
  const lines = ['top', 'right', 'bottom', 'left'];
  const [mode, setMode] = useState('dark');
  useEffect(() => {
    if (mode === 'dark') {
      document.querySelector('.login-container').style.background = '#212534';
    } else {
      document.querySelector('.login-container').style.background = '#ffffff';
    }
  }, [mode]);
  return (
    <div className="login-container flx-center">
      {/* PC端登陆页面 */}
      <div className="login-form-bc flx-center">
        {lines.map((index) => (
          <div key={index} className="line"></div>
        ))}
        {/* 左边背景 */}
        <div className="login-form-left">
          <img src={loginBc1} />
        </div>
        {/* 登陆页面 */}
        <LoginForm />
      </div>
      {/* 手机端登陆页面 */}
      <div className="login-form-phone flx-center">
        <LoginFormPhone />
      </div>
      {/* 头部 */}
      <Header className="login-header">
        <img src={mrkLogo} alt="" height="20" />
        <div>
          <Tooltip title="全屏" color="transparent">
            <a onClick={handleFullScreenClick}>
              <i className="iconfont mr-menu-4 login-icon"></i>
            </a>
          </Tooltip>
          <a onClick={() => setMode(mode === 'dark' ? 'default' : 'dark')}>
            <i className="iconfont mr-evening-moon2 login-icon"></i>
          </a>
          <Tooltip title="中/英" color="transparent">
            <a>
              <i className="iconfont mr-duoyuyan login-icon"></i>
            </a>
          </Tooltip>
          <a>
            <i className="iconfont mr-lianxiwomen login-icon"></i>
          </a>
        </div>
      </Header>
      {/* 底部说明 */}
      <Footer
        style={{
          position: 'fixed',
          bottom: '0',
          background: 'transparent',
          color: '#fff',
        }}
      >
        <div className="text-center flx-justify-around">
          <a className="color-text-fff user-select">帮助</a>
          <a className="color-text-fff user-select">隐私</a>
          <a className="color-text-fff user-select">条款</a>
        </div>
        <MrFooter />
      </Footer>
    </div>
  );
}

export default Login;
