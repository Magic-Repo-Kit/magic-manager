import React, { useContext } from 'react';
import Login from './login';
import Register from './register';
import { IsRegisterContext } from '../index';

import './index.scss';

function FormModal() {
  const { isRegister } = useContext(IsRegisterContext);
  return (
    <div className="form-container">
      {/* 登录 */}
      <div className="form-login">{isRegister ? <Register /> : <Login />}</div>
    </div>
  );
}

export default FormModal;
