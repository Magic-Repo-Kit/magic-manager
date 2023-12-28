import React, { useState } from 'react';
import './index.scss';

const SwitchBtn = ({ isRegister, handRegisterChange }) => {
  return (
    <div className="switch-container">
      <div className="btn-container">
        <label className="switch btn-color-mode-switch">
          <input
            checked={isRegister}
            id="color_mode"
            name="color_mode"
            type="checkbox"
            onChange={handRegisterChange}
          />
          <label
            className="btn-color-mode-switch-inner"
            data-off="登录"
            data-on="注册"
            htmlFor="color_mode"
          ></label>
        </label>
      </div>
    </div>
  );
};

export default SwitchBtn;
