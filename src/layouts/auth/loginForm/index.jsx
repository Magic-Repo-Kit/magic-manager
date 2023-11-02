import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { message } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import './index.scss';
import { loginAPI, getPlatformAuth, platformLoginAPI } from '@/services/auth';
import { setAccessToken, setRefreshToken } from '@/utils/tools';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 监听地址栏
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const params = {
      type: '10', // 10-github 20-google 30-gitee
      code,
      state,
    };
    console.log('🚀 ~ file: index.jsx:26 ~ useEffect ~ code:', code);
    console.log('🚀 ~ file: index.jsx:27 ~ useEffect ~ state:', state);
    if (code && state) {
      const res = platformLoginAPI(params);
      if (res.code === 200) {
        const { access_token, refresh_token } = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        navigate('/admin');
        message.success('登录成功');
      } else {
        message.error(res.msg || '登录失败');
      }
    }
  }, [location.search, navigate]);

  // 账号密码登录
  const handleLogin = async (e) => {
    e.preventDefault();
    // 添加登录处理函数
    try {
      const res = await loginAPI({ username, password });
      if (res.code === 200) {
        const { access_token, refresh_token } = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        navigate('/admin');
        message.success('登录成功');
      } else {
        message.error(res.msg || '登录失败');
      }
    } catch (error) {
      message.error(error.msg || '登录失败');
    }
  };
  // 第三方平台登录
  const platformLogin = async (type) => {
    console.log('🚀 ~ file: index.jsx:20 ~ LoginForm ~ location:', location);
    const params = {
      type, // 10-github 20-google 30-gitee
      redirectUri: window.location.href,
      // redirectUri: 'https://mrk.auroralpixel.world/auth',
    };
    const res = await getPlatformAuth(params);
    console.log('🚀 ~ file: index.jsx:48 ~ platformLogin ~ res:', res);
    if (res.code === 200) {
      message.open({
        type: 'loading',
        content: '正在跳转，请稍后..',
        duration: 0,
      });
      window.location.href = res.data;
      setTimeout(message.destroy, 2500);
    } else {
      message.error(res.msg || '获取授权失败');
    }
  };

  return (
    <div className="form-box">
      <div className="form-container-box" ref={containerRef}>
        {/* 登录 */}
        <div className="form-container sign-in-container">
          <form action="#" className="formIn">
            <h1>登录</h1>
            {/* 第三方登陆 */}
            <div className="social-container flx-center">
              <a className="social">
                <GithubOutlined
                  style={{ fontSize: '24px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    platformLogin('10');
                  }}
                />
              </a>
              <a className="social">
                <i
                  className="iconfont mr-gitee"
                  style={{ fontSize: '24px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    platformLogin('30');
                  }}
                ></i>
              </a>
              <a className="social">
                <GoogleOutlined
                  style={{ fontSize: '24px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    platformLogin('20');
                  }}
                />
              </a>
            </div>
            <span style={{ color: '#3f3f3f' }}>使用第三方平台快速登录</span>
            <input
              type="text"
              placeholder="账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a>忘记密码？</a>
            <button onClick={handleLogin}>登 录</button>
          </form>
        </div>

        {/* 注册 */}
        <div className="form-container sign-up-container">
          <form action="#" className="formUp">
            <h1>创建账户</h1>
            {/* <h1>Create Account</h1> */}
            <div className="social-container">
              <a className="social">
                <GoogleOutlined style={{ fontSize: '24px' }} />
              </a>
              <a className="social">
                <GithubOutlined style={{ fontSize: '24px' }} />
              </a>
              <a className="social">
                <WechatOutlined style={{ fontSize: '24px' }} />
              </a>
            </div>
            <input type="text" placeholder="账户名" />
            <input type="text" placeholder="账号" />
            <input type="password" placeholder="密码" />
            <button style={{ marginTop: '15px' }}>注 册</button>
            {/* <button>Sign Up</button> */}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>欢迎回来！</h1>
              <p>为了与我们保持联系，请使用您的个人信息登录。</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  containerRef.current.classList.remove('right-panel-active');
                }}
              >
                登 录
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello Magicrepokit</h1>
              <p>输入您的个人详细信息，与我们一起开始旅程。</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  containerRef.current.classList.add('right-panel-active');
                }}
              >
                注 册
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
