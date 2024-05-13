import React, { useState, useContext, useEffect } from 'react';
import './index.scss';
import { throttle } from 'lodash'; //lodash 节流函数
import {
  registerAPI,
  sendCodeAPI,
  forgetPwdAPI,
  checkEmailAPI,
  checkAccountAPI,
} from '@/request/auth';

import { useNavigate } from 'react-router-dom';
import { WholeLoadingContext } from '@/components/whole-loading-provider'; //全局Loading控制

// antd组件
import { message, Button } from 'antd';

// 上下文
import { IsRegisterContext } from '../index';
import { IsForgetPwdContext } from '../index';

function ForgetPwd() {
  // 上下文
  const { isRegister, setIsRegister } = useContext(IsRegisterContext);
  const { isForgetPwd, setIsForgetPwd } = useContext(IsForgetPwdContext);

  // 共享参数
  const { setIsLoading } = useContext(WholeLoadingContext);
  // 参数
  const [showPassword, setShowPassword] = useState(false);
  const [vCodeLoading, setVCodeLoading] = useState(false); //验证码加载状态
  const [countdown, setCountdown] = useState(0);

  // 账号信息
  const [email, setEmail] = useState(''); //邮箱
  const [verificationCode, setVerificationCode] = useState(''); //验证码
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showEmailTips, setShowEmailTips] = useState(false);
  const [showVerificationCodeTips, setShowVerificationCodeTips] =
    useState(false);
  const [showPasswordTips, setShowPasswordTips] = useState(false);
  const [showConfirmPwdTips, setShowConfirmPwdTips] = useState(false);

  // 过滤输入 | 控制显示消息
  const filterInput = (e, setValue, setShowTips) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9_\-.@]/g, '');
    const maxLengthValue = filteredValue.match(/^.{0,30}/)[0]; // 最多匹配前30个字符
    setValue(maxLengthValue);
    if (filteredValue !== inputValue) {
      setShowTips(true); // 显示提示信息
    } else {
      setShowTips(false); // 隐藏提示信息
    }
  };
  // 校验邮箱格式
  const formatEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // 发送验证码
  const sendCode = async () => {
    if (countdown > 0) {
      return;
    }
    if (!email) {
      message.warning('请输入邮箱');
      return;
    }
    if (!formatEmail(email)) {
      message.warning('请输入正确的邮箱');
      return;
    }

    // 如果邮箱没有注册
    try {
      const res = await checkEmailAPI({ email });
      if (res.code === 200) {
        if (!res.data) {
          message.warning('该邮箱未注册，请先注册');
          setVCodeLoading(false);
          return;
        }
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error(error.msg);
    }

    setVCodeLoading(true);
    // 发送验证码 - 忘记密码
    try {
      const res = await sendCodeAPI(email, 2);
      if (res.code === 200) {
        if (res.data) {
          message.success('验证码已发送，请注意查收');
          setCountdown(60);
        }
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error(error.msg);
    } finally {
      setVCodeLoading(false);
    }
  };

  // 重置密码
  const handleReset = throttle(async (e) => {
    e.preventDefault();
    // 校验
    if (!email) {
      message.warning('请输入邮箱');
      return;
    }
    if (!formatEmail(email)) {
      message.warning('请输入正确的邮箱');
      return;
    }
    if (!verificationCode) {
      message.warning('请输入验证码');
      return;
    }
    if (!password) {
      message.warning('请输入密码');
      return;
    }
    if (!confirmPassword) {
      message.warning('请再次输入密码');
      return;
    }
    if (password !== confirmPassword) {
      message.warning('两次输入的密码不一致');
      return;
    }

    // 如果邮箱没有注册
    try {
      const res = await checkEmailAPI({ email });
      if (res.code === 200) {
        if (!res.data) {
          message.warning('该邮箱未注册，请先注册');
          return;
        }
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error(error.msg);
    }

    setIsLoading(true);

    const parmas = JSON.stringify({
      email,
      password,
      confirmPassword,
      verificationCode,
    });
    // 添加注册处理函数
    try {
      const res = await forgetPwdAPI(parmas);
      if (res.code === 200) {
        if (res.data) {
          message.success('密码重置成功，去登录试试');
          setIsForgetPwd(false);
        }
      } else {
        if (res.msg === 'CAPTCHA_ERROR') {
          message.warning('验证码错误');
          return;
        }
        message.error(res.msg);
      }
    } catch (error) {
      message.error(error.msg);
    } finally {
      setIsLoading(false);
    }
  }, 1000);

  useEffect(() => {
    let timer = null;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);
  return (
    <div className="login-container">
      <div className="form-box user-select">
        {/* 邮箱 */}
        <div className="input-title">
          邮箱：
          {email.length < 30 ? (
            showEmailTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过30</span>
          )}
        </div>
        <div className="input-content">
          <i className="iconfont mr-youjianyouxiang"></i>
          <input
            type="text"
            className="input-text"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => filterInput(e, setEmail, setShowEmailTips)}
          />
        </div>
        {/* 验证码 */}
        <div className="input-title">
          验证码：
          {verificationCode.length < 30 ? (
            showVerificationCodeTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过30</span>
          )}
        </div>
        <div className="input-content">
          <i className="iconfont mr-yanzhengma1"></i>
          <input
            type="text"
            className="input-text"
            placeholder="请输入验证码"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            onBlur={(e) =>
              filterInput(e, setVerificationCode, setShowVerificationCodeTips)
            }
          />
          <div className="send-btn">
            <Button
              type="primary"
              // disabled={vCodeLoading || countdown > 0}
              loading={vCodeLoading}
              onClick={sendCode}
            >
              {countdown > 0 ? `${countdown}s` : '发送'}
            </Button>
          </div>
        </div>
        {/* 密码 */}
        <div className="input-title">
          密码：
          {password.length < 30 ? (
            showPasswordTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过30</span>
          )}
        </div>
        <div className="input-content">
          <i
            className={`iconfont ${showPassword ? 'mr-jiesuo' : 'mr-mima'} `}
          ></i>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-text"
            placeholder="请输入密码"
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
        {/* 确认密码 */}
        <div className="input-title">
          确认密码：
          {confirmPassword.length < 30 ? (
            showConfirmPwdTips && (
              <span className="title-tips">请输入数字、字母或 _ - . @</span>
            )
          ) : (
            <span className="title-tips">最大长度不能超过30</span>
          )}
        </div>
        <div className="input-content">
          <i
            className={`iconfont ${showPassword ? 'mr-jiesuo' : 'mr-mima'} `}
          ></i>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-text"
            placeholder="请确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={(e) =>
              filterInput(e, setConfirmPassword, setShowConfirmPwdTips)
            }
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

        <button className="button-submit forget-pwd-btn" onClick={handleReset}>
          重置密码
        </button>

        {/* 第三方平台登录 */}
        <div className="form-login-or font-family-dingding">OR</div>
        <p className="register">
          <span
            className="link"
            onClick={() => {
              setIsForgetPwd(false);
            }}
          >
            返回登录
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgetPwd;
