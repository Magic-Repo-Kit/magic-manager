import React, { useState, useContext } from 'react';
import Login from './login';
import Register from './register';
import ForgetPwd from './forget-pwd';
import { IsRegisterContext, IsForgetPwdContext } from '../index';

import './index.scss';

function FormModal() {
  const { isRegister } = useContext(IsRegisterContext);
  const { isForgetPwd } = useContext(IsForgetPwdContext);

  // const [rememberEmail, setRememberEmail] = useState(''); // 记住账号
  return (
    <div className="form-container">
      {isForgetPwd ? (
        <ForgetPwd />
      ) : (
        <div className="form-login">
          {isRegister ? <Register /> : <Login />}
        </div>
      )}
    </div>
  );
}

export default FormModal;
