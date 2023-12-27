import React, { useState } from 'react';
import Login from './login';
import './index.scss';

const FormModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="form-container">
      {/* 登录 */}
      <div className="form-login">
        <Login />
      </div>
      {/* 注册 */}
      <div className="form-register"></div>
    </div>
  );
};

export default FormModal;
