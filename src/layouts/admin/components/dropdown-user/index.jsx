import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import './index.scss';

import UploadImage from '@/components/upload-image';

// 图片
import userHead from '@/assets/images/user-head.png';

// antd组件
import { message } from 'antd';

function DropdownUser({ setUserOpen }) {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  // const navigate = useNavigate(); //路由

  // 参数
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('谭智亮'); //名称
  const [tempName, setTempName] = useState(name);
  const [username] = useState('admin'); //账号
  const [email, setEmail] = useState('319403451@qq.com'); //邮箱
  const [tempEmail, setTempEmail] = useState(email);

  const [password, setPassword] = useState(''); // 旧密码
  const [newPwd, setNewPwd] = useState(''); //新密码
  const [repeatPwd, setRepeatPwd] = useState(''); //二次确认
  const [showPasswordTips, setShowPasswordTips] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showPwdForm, setShowPwdForm] = useState(false); //显示修改密码表单

  // 个人信息修改保存
  const handleSave = () => {
    if (name !== tempName) {
      setName(tempName);
    }
    if (email !== tempEmail) {
      setEmail(tempEmail);
    }
    // 调接口更新
    setIsEditing(false);
  };
  // 个人信息修改取消
  const handleCancel = () => {
    setTempName(name);
    setTempEmail(email);
    setIsEditing(false);
  };

  // 过滤输入 | 控制显示消息
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
  // 修改密码
  const handleChangePwd = async (e) => {
    e.preventDefault();
    if (!password) {
      message.warning('请输入旧密码');
      return;
    }
    if (!newPwd) {
      message.warning('请输入新密码');
      return;
    }
    if (!repeatPwd) {
      message.warning('请再次输入新密码');
      return;
    }
    if (newPwd !== repeatPwd) {
      message.warning('新密码两次输入不一致');
      return;
    }
    // loading
  };

  return (
    <div className={`custom-dropdown-user ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <i
          className="iconfont mr-guanbi cursor-point"
          onClick={() => setUserOpen(false)}
        ></i>
      </header>
      <main>
        <div className="dropdown-main-top">
          <div className="dropdown-main-top-left">
            <div className="dropdown-main-introduce font-family-dingding">
              <div>Hi，谭智亮！</div>
              <div>这是你的个人名片。</div>
            </div>

            <div className="dropdown-main-user font-family-dingding">
              <i className="iconfont mr-user--line"></i>
              <span>admin</span>
            </div>
          </div>
          <div className="dropdown-main-top-right font-family-dingding">
            <div className="dropdown-main-head">
              <img src={userHead} alt="" />
            </div>
            <div className="dropdown-main-star">
              <span>126个</span>
              <i className="iconfont mr-like-full"></i>
            </div>
          </div>
        </div>

        <div className="dropdown-main-info">
          <div className="dropdown-main-info-edit">
            {isEditing ? (
              <div className="dropdown-main-info-edit-icon">
                <i
                  className="iconfont mr-queren right-icon click-jump"
                  onClick={handleSave}
                ></i>
                <i
                  className="iconfont mr-guanbi1 click-jump"
                  onClick={handleCancel}
                ></i>
              </div>
            ) : (
              <div className="dropdown-main-info-edit-icon">
                <i
                  className="iconfont mr-change-1 click-jump"
                  onClick={() => setIsEditing(true)}
                ></i>
              </div>
            )}
          </div>
          <div className="dropdown-main-info-title font-family-dingding">
            个人信息
          </div>
          <div className="dropdown-main-info-item">
            <span>名称：</span>
            {isEditing ? (
              <input
                type="text"
                className="input-text"
                placeholder="输入您的名称"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
          <div className="dropdown-main-info-item">
            <span>账号：</span>
            <span>{username}</span>
          </div>
          <div className="dropdown-main-info-item">
            <span>邮箱：</span>
            {isEditing ? (
              <input
                type="text"
                className="input-text"
                placeholder="输入您的名称"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
          <div className="dropdown-main-info-item">
            <span>Github：</span>
            <span>Odin-7</span>
          </div>
        </div>
        <div className="dropdown-main-info dropdown-main-info-setting">
          <div className="dropdown-main-info-title font-family-dingding">
            设置
          </div>
          <div className="dropdown-main-info-setting-code user-select dropdown-main-info-item">
            <span className="title">修改密码</span>
            <div
              className="change-icon click-jump"
              onClick={() => setShowPwdForm(!showPwdForm)}
            >
              <i className="iconfont mr-michi"></i>
            </div>
            {/* 
            <span className="tips">
              {password.length < 12 ? (
                showPasswordTips && (
                  <span className="title-tips">请输入数字、字母或 _ - . @</span>
                )
              ) : (
                <span className="title-tips">最大长度不能超过12</span>
              )}
            </span> */}
          </div>

          {/* 修改密码 */}
          <div
            className={`user-select dropdown-main-info-setting-pwd-box ${
              showPwdForm ? 'pwd-box-expanded' : ''
            }`}
          >
            {/* 旧密码 */}
            <div className="dropdown-main-info-setting-pwd">
              <div className="input-title">旧密码：</div>
              <div className="input-content">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-text"
                  defaultValue={password}
                  onBlur={(e) =>
                    filterInput(e, setPassword, setShowPasswordTips)
                  }
                  placeholder="请输入旧密码"
                />
                <div
                  className="icon-eyes-box"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ opacity: !showPassword ? '0.6' : '1' }}
                >
                  <i className={`icon-eyes iconfont mr-chakan_yulan `}></i>
                  <div
                    className={`icon-line ${!showPassword ? 'line-w' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
            {/* 新密码 */}
            <div className="dropdown-main-info-setting-pwd">
              <div className="input-title">新密码：</div>
              <div className="input-content">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-text"
                  defaultValue={newPwd}
                  onBlur={(e) => filterInput(e, setNewPwd, setShowPasswordTips)}
                  placeholder="请输入修改密码"
                />
                <div
                  className="icon-eyes-box"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ opacity: !showPassword ? '0.6' : '1' }}
                >
                  <i className={`icon-eyes iconfont mr-chakan_yulan `}></i>
                  <div
                    className={`icon-line ${!showPassword ? 'line-w' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
            {/* 新密码|二次确认 */}
            <div className="dropdown-main-info-setting-pwd">
              <div className="input-title">再次输入：</div>
              <div className="input-content">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-text"
                  defaultValue={repeatPwd}
                  onBlur={(e) =>
                    filterInput(e, setRepeatPwd, setShowPasswordTips)
                  }
                  placeholder="请再次输入修改密码"
                />
                <div
                  className="icon-eyes-box"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ opacity: !showPassword ? '0.6' : '1' }}
                >
                  <i className={`icon-eyes iconfont mr-chakan_yulan `}></i>
                  <div
                    className={`icon-line ${!showPassword ? 'line-w' : ''}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown-main-info-item">
            <div className="title">更换头像</div>
            <div>
              <UploadImage
                maxNums={1}
                acceptedFileTypes={['image/jpeg', 'image/png']}
              />
            </div>
          </div>
          <div className="dropdown-main-info-item">
            <span>链接社交账号</span>
          </div>
        </div>
      </main>
      <footer onClick={() => window.location.replace('/auth')}>
        <div className="space-line"></div>
        <div className="login-out-box user-select">
          <i className="iconfont mr-tuichu2 login-out"></i>
          <div className="login-text">退出登录</div>
        </div>
      </footer>
    </div>
  );
}

export default DropdownUser;
