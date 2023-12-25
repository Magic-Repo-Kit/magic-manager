import React from 'react';
import './index.scss';

const btnLogin = ({ content }) => {
  return (
    <>
      <button className="login-btn">
        <div className="contDefault">{content}</div>

        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>
    </>
  );
};

export default btnLogin;
