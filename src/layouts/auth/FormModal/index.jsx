import React, { useState } from 'react';
import Login from './login';
import './index.scss';

const FormModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="form-container">
      <div className="form-toggle">
        <input id="checkbox_toggle" type="checkbox" className="check" />
        <div className="checkbox">
          <label className="slide" for="checkbox_toggle">
            <label className="toggle" for="checkbox_toggle"></label>
            <label className="text" for="checkbox_toggle">
              登陆
            </label>
            <label className="text" for="checkbox_toggle">
              注册
            </label>
          </label>
        </div>
      </div>
      {/* 登录 */}
      <div className="form-login">
        <Login />
      </div>
      {/* 注册 */}
      <div className="form-register">12121</div>
    </div>
  );
};

export default FormModal;
