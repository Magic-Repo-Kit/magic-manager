import './index.less';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  WechatOutlined,
} from '@ant-design/icons';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function LoginForm() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="form-box">
      <div
        className="form-box-title"
        style={{
          fontSize: '25px',
          fontFamily: '钉钉进步体 Regular',
        }}
      >
        Magicrepokit 百宝袋
      </div>

      <div className="form-container-box" ref={containerRef}>
        {/* 注册 */}
        <div className="form-container sign-up-container">
          <form action="#">
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
            <button>注 册</button>
            {/* <button>Sign Up</button> */}
          </form>
        </div>
        {/* 登录 */}
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>登录</h1>
            {/* <h1>Sign in</h1> */}
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
            {/* <span style={{ color: '#3f3f3f' }}>or use your account</span> */}
            <input type="text" placeholder="账号" />
            <input type="password" placeholder="密码" />
            <a href="#">忘记密码？</a>
            {/* <a href="#">Forgot your password?</a> */}
            <button
              onClick={() => {
                message.success('登录成功，正在跳转...');
                setTimeout(() => {
                  navigate('/admin/home');
                }, 1000);
              }}
            >
              登 录
            </button>
            {/* <button>Sign In</button> */}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>欢迎回来！</h1>
              {/* <h1>Welcome Back!</h1> */}
              <p>为了与我们保持联系，请使用您的个人信息登录。</p>
              {/* <p>
                To keep connected with us please login with your personal info
              </p> */}
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
