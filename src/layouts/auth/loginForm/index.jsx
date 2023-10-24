import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Form, Input, message } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import './index.scss';
import ajax from '@/utils/ajax';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // 添加登录处理函数
    try {
      const response = await ajax.post('/system/auth/login', {
        username,
        password,
      }); // 调用登录接口
      // 根据你的 API 返回结构处理响应
      console.log(
        '🚀 ~ file: index.jsx:32 ~ handleLogin ~ response:',
        response
      );
      if (response.status === 200) {
        message.success('登录成功，正在跳转...');
        navigate('/admin');
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      message.error('登录失败');
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
            <div className="social-container">
              <a href="#" className="social">
                <GoogleOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href="#" className="social">
                <GithubOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href="#" className="social">
                <WechatOutlined style={{ fontSize: '24px' }} />
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
            <a href="#">忘记密码？</a>
            {/* <a href="#">Forgot your password?</a> */}
            <button onClick={handleLogin}>登 录</button>
            {/* <button>Sign In</button> */}
          </form>
        </div>
        {/* 注册 */}
        <div className="form-container sign-up-container">
          <form action="#" className="formUp">
            <h1>创建账户</h1>
            {/* <h1>Create Account</h1> */}
            <div className="social-container">
              <a href="#" className="social">
                <GoogleOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href="#" className="social">
                <GithubOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href="#" className="social">
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
