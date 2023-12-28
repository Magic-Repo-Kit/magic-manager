import React, { useState } from 'react';
import Login from './login';
import Register from './register';

import './index.scss';

const FormModal = ({ isRegister }) => {
  return (
    <div className="form-container">
      {/* 登录 */}
      <div className="form-login">{isRegister ? <Register /> : <Login />}</div>
    </div>
  );
};

export default FormModal;
