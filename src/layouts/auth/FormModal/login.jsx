import React, { useState } from 'react';
import './index.scss';

import google from '@/assets/images/google.png';
import github from '@/assets/images/github.png';
import gitee from '@/assets/images/gitee.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-container">
      <div className="form-box user-select">
        {/* 账号 */}
        <div className="input-title">账号：</div>
        <div className="input-content">
          <i className="iconfont mr-danren"></i>
          <input
            type="text"
            className="input-text"
            placeholder="输入您的账号"
          />
        </div>
        {/* 密码 */}
        <div className="input-title">密码：</div>
        <div className="input-content">
          <i
            className={`iconfont ${showPassword ? 'mr-jiesuo' : 'mr-mima'} `}
          ></i>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-text"
            placeholder="输入您的密码"
          />
          <div
            className="icon-eyes-box"
            onClick={() => setShowPassword(!showPassword)}
            style={{ opacity: !showPassword ? '0.6' : '1' }}
          >
            <i className={`icon-eyes iconfont mr-chakan_yulan `}></i>
            <div className={`icon-line ${!showPassword ? 'line-w' : ''}`}></div>
          </div>
        </div>

        <div className="form-other">
          <div>
            <input type="checkbox" />
            <label>记住密码</label>
          </div>
          <span className="link">忘记密码?</span>
        </div>

        <button className="button-submit">登 录</button>
        <div className="form-login-or">OR</div>
        <div className="fast-box">
          <button className="fast-btn github">
            <img src={github} />
            Github登录
          </button>
          <button className="fast-btn gitee">
            <img src={gitee} />
            Gitee登录
          </button>
          <button className="fast-btn google">
            <img src={google} />
          </button>
        </div>
        <p className="register">
          还没账户? <span className="link">去注册</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
