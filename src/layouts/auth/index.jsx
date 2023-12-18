import React, { useState, useEffect } from 'react';
import LoginForm from './loginForm/pc-login';
import LoginFormPhone from './loginForm/app-login';
import MrFooter from '@/components/mr-footer';
import Cube from '@/components/Cube';

import './index.scss';

import mrkLogoLight from '@/assets/images/mrk-light.png';
import mrkLogoDark from '@/assets/images/mrk-dark.png';
import mrkLogo from '@/assets/images/logo-mrk.png';
import loginBc1 from '@/assets/images/login-vr.svg';

import loginBcRobot from '@/assets/images/login-bg-robot.png';
import loginBcTop from '@/assets/images/login-bg-top.png';
import loginBcLeft from '@/assets/images/login-bg-left.png';
import loginBcBottom from '@/assets/images/login-bg-bottom.png';
import loginBcBoll1 from '@/assets/images/login-bg-ball1.png';
import loginBcBoll2 from '@/assets/images/login-bg-ball2.png';
import loginBcLight from '@/assets/images/login-bg-light.png';

import CircularText from '@/components/circular-text';

import { handleFullScreenClick } from '@/utils/tools';

import { Layout, Tooltip } from 'antd';
const { Header, Footer } = Layout;

function Login() {
  const lines = ['top', 'right', 'bottom', 'left'];
  const [mode, setMode] = useState('dark');
  // useEffect(() => {
  //   if (mode === 'dark') {
  //     document.querySelector('.login-container').style.background = '#212534';
  //   } else {
  //     document.querySelector('.login-container').style.background = '#ffffff';
  //   }
  // }, [mode]);
  return (
    <div className="login-container">
      {/* PC端登陆页面 */}
      <div className="login-form-bc flx-justify-between">
        {/* {lines.map((index) => (
          <div key={index} className="line"></div>
        ))} */}
        {/* 左边背景 */}
        {/* <div className="login-form-left">
          <img src={loginBc1} />
        </div> */}
        <div className="login-left">
          <div className="login-left-bg"></div>
          <div className="login-left-box">
            <div className="login-left-content">
              <div>永远相信美好的事情</div>
              <Cube />
            </div>
          </div>
        </div>
        <div className="login-right">
          <LoginForm />
        </div>
        {/* 登陆页面 */}
      </div>
      {/* 手机端登陆页面 */}
      <div className="login-form-phone flx-center">
        <LoginFormPhone />
      </div>
      {/* logo */}
      <div className="login-logo flx-center">
        <img src={mrkLogo} alt="" height="18" />
        <img src={mrkLogoLight} alt="MRK" height="16" />
      </div>

      {/* 头部 */}
      {/* <Header className="login-header">
        <img src={mrkLogo} alt="" height="20" />
        <div
          onClick={() => navigate('/admin')}
          className="cursor-point flx-center "
          style={{ height: '60px' }}
        >
          <img
            src={mrkLogo}
            height="25"
            className="login-mrk-logo rotated-infinite"
          />
          <img
            src={mode === 'default' ? mrkLogoLight : mrkLogoDark}
            alt="MRK"
            height="20"
          />
        </div>
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
      </Header> */}
      {/* 底部说明 */}
      {/* <Footer
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
      </Footer> */}
      {/* 背景元素 */}
      {/* <div className="login-circle-right float-left-top"></div>
      <div className="login-circle-bottom float-left-top"></div> */}
      {/* <img
        src={loginBcRobot}
        alt=""
        width="800px"
        style={{ position: 'absolute', bottom: '0', right: '0' }}
      />
      <img
        src={loginBcTop}
        alt=""
        style={{ position: 'absolute', top: '0', right: '0' }}
      />
      <img
        src={loginBcLeft}
        alt=""
        style={{ position: 'absolute', top: '0', left: '0' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        <img
          src={mrkLogo}
          height="25"
          className="login-mrk-logo rotated-infinite"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <img
          src={mrkLogoDark}
          height="20"
          alt=""
          style={{ marginLeft: '5px' }}
        />
      </div> */}
      {/* <img
        src={loginBcBottom}
        alt=""
        style={{ position: 'absolute', bottom: '0', left: '0' }}
      />
      <img
        className="rotate-move-infinite"
        src={loginBcLight}
        alt=""
        style={{ position: 'absolute', top: '40px', right: '220px' }}
      />
      <img
        src={loginBcBoll1}
        alt=""
        height="100px"
        style={{ position: 'absolute', bottom: '40px', left: '30%' }}
      />
      <img
        src={loginBcBoll2}
        alt=""
        style={{ position: 'absolute', bottom: '200px', left: '20%' }}
      /> */}
      {/* <CircularText
        text="MAGICR EPOKIT·MAGICREPOKIT·"
        // color="#fff"
        style={{
          width: '30px',
          height: '30px',
          position: 'absolute',
          left: '30px',
          bottom: '50px',
        }}
      /> */}
    </div>
  );
}

export default Login;
