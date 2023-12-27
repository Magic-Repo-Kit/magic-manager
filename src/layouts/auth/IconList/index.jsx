import React from 'react';
import './index.scss';

const IconList = () => {
  return (
    <>
      <div className="icon-list-box">
        <a
          className="social-link link-github no-style"
          target="_blank"
          href="https://github.com/Magic-Repo-Kit"
          rel="noreferrer"
        >
          <i className="iconfont mr-github1"></i>
        </a>
        <a
          className="social-link link-gitee no-style"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Magic-Repo-Kit"
        >
          <i className="iconfont mr-gitee"></i>
        </a>
      </div>
    </>
  );
};

export default IconList;
