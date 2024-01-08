import React, { useState, useContext, useEffect } from 'react';
import './index.scss';
import { throttle } from 'lodash'; //lodash 节流函数
import { loginAPI, getPlatformAuth } from '@/request/auth';
import { setAccessToken, setRefreshToken } from '@/utils/tools';
import { useNavigate } from 'react-router-dom';
import { WholeLoadingContext } from '@/components/whole-loading-provider'; //全局Loading控制

// 静态组件
import google from '@/assets/images/google.png';
import github from '@/assets/images/github.png';
import gitee from '@/assets/images/gitee.png';

// antd组件
import { message } from 'antd';

// 上下文
import { IsRegisterContext } from '../index';

function Login() {
  // 上下文
  const { isRegister, setIsRegister } = useContext(IsRegisterContext);

  // 共享参数
  const { setIsLoading } = useContext(WholeLoadingContext);
  // 参数
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameTips, setShowUsernameTips] = useState(false);
  const [showPasswordTips, setShowPasswordTips] = useState(false);

  const navigate = useNavigate();

  // 过滤输入 | 控制显示消息 【此处留一个问题，compositionstart和compositionend事件，compositionend事件在react中不会触发？】
  const filterInput = (e, setValue, setShowTips) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9_\-.@]/g, '');
    const maxLengthValue = filteredValue.match(/^.{0,12}/)[0]; // 最多匹配前12个字符
    setValue(maxLengthValue);
    if (filteredValue !== inputValue) {
      setShowTips(true); // 显示提示信息
    } else {
      setShowTips(false); // 隐藏提示信息
    }
  };

  // 账号登录
  const handleLogin = throttle(async (e) => {
    e.preventDefault();
    // 校验
    if (!username) {
      message.warning('请输入账号');
      return;
    }
    if (!password) {
      message.warning('请输入密码');
      return;
    }
    if (showUsernameTips) {
      message.warning('请输入正确格式账号');
      return;
    }
    if (showPasswordTips) {
      message.warning('请输入正确格式密码');
      return;
    }

    setIsLoading(true);
    // 添加登录处理函数
    try {
      const res = await loginAPI({ username, password });
      if (res.code === 200) {
        const { access_token, refresh_token } = res.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        navigate('/admin');
      } else {
        message.error(res.msg || '登录失败');
      }
    } catch (error) {
      message.error(error.msg || '登录失败');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, 1000);

  // 第三方平台登录
  const platformLogin = throttle(async (platformName) => {
    setIsLoading(true);
    // 10-github 20-google 30-gitee
    const type =
      platformName === 'github' ? 10 : platformName === 'google' ? 20 : 30;
    sessionStorage.setItem('platformType', type);
    const redirectUri = window.location.href;
    // const redirectUri = 'https://mrk.auroralpixel.world/auth';

    // 获取第三方授权地址
    try {
      const res = await getPlatformAuth({ type, redirectUri });
      if (res.code === 200) {
        // 跳转到第三方平台授权页面
        window.location.href = res.data;
      } else {
        message.error(res.msg || '获取授权失败');
      }
    } catch (error) {
      message.error(error.msg || '获取授权失败');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, 1000);

  return (
    <div className="login-container">
      <div className="form-box user-select">
        {/* 账号 */}
        <div className="input-title">
          账号：
          {username.length < 12 ? (
            showUsernameTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过12</span>
          )}
        </div>
        <div className="input-content">
          <i className="iconfont mr-danren"></i>
          <input
            type="text"
            className="input-text"
            placeholder="输入您的账号"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => filterInput(e, setUsername, setShowUsernameTips)}
          />
        </div>
        {/* 密码 */}
        <div className="input-title">
          密码：
          {password.length < 12 ? (
            showPasswordTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过12</span>
          )}
        </div>
        <div className="input-content">
          <i
            className={`iconfont ${showPassword ? 'mr-jiesuo' : 'mr-mima'} `}
          ></i>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-text"
            placeholder="输入您的密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => filterInput(e, setPassword, setShowPasswordTips)}
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

        <button className="button-submit" onClick={handleLogin}>
          登 录
        </button>

        {/* 第三方平台登录 */}
        <div className="form-login-or font-family-dingding">OR</div>
        <div className="fast-box">
          <button
            className="fast-btn github"
            onClick={() => platformLogin('github')}
          >
            <img src={github} />
            Github登录
          </button>
          <button
            className="fast-btn gitee"
            onClick={() => platformLogin('gitee')}
          >
            <img src={gitee} />
            Gitee登录
          </button>
          <button
            className="fast-btn google"
            onClick={() => platformLogin('google')}
          >
            <img src={google} />
          </button>
        </div>
        <p className="register">
          还没账户?{' '}
          <span className="link" onClick={() => setIsRegister(!isRegister)}>
            去注册
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
