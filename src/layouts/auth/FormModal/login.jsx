import React, { useState } from 'react';
import './index.scss';

const Login = () => {
  return (
    <div className="login-container">
      <form className="form">
        <div className="flex-column">
          <label>账号：</label>
        </div>
        <div className="inputForm">
          <input type="text" className="input" placeholder="输入您的账号" />
        </div>

        <div className="flex-column">
          <label>密码：</label>
        </div>
        <div className="inputForm">
          <input type="password" className="input" placeholder="输入您的密码" />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>记住密码</label>
          </div>
          <span className="span">忘记密码?</span>
        </div>
        <button className="button-submit">登陆</button>
        <p className="p">
          没有账户? <span className="span">去注册</span>
        </p>
        <p className="pline">快速登陆</p>

        <div className="flex-row">
          <button className="btn google">Google</button>
          <button className="btn apple">Apple</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
