import React, { useState } from 'react';
import './index.scss';
import userHead from '@/assets/images/user-head.png';

function MyCreated() {
  return (
    <div className="my-space-container">
      <header>
        {/* 个人信息 */}
        <div className="user-info font-family-dingding">
          <div className="user-info-left">
            <div className="user-info-introduce">
              <div>Hi，谭智亮！</div>
              <div>这是你的个人名片。</div>
            </div>
            <div className="user-info-user">
              <i className="iconfont mr-user--line"></i>
              <span>愿我有所发现、有所创造。</span>
            </div>
          </div>
          <div className="user-info-right">
            <div className="user-info-head">
              <img src={userHead} alt="" />
            </div>
            <div className="user-info-star">
              <span>126个</span>
              <i className="iconfont mr-like-full"></i>
            </div>
          </div>
        </div>
        {/* 个人数据 */}
        <div className="user-data filter-drop-shadow font-family-dingding">
          <div className="flx-center">
            <div>关注</div>
            <div>24</div>
          </div>
          <div className="flx-center">
            <div>粉丝</div>
            <div>102</div>
          </div>
          <div className="flx-center">
            <div>访问</div>
            <div>121</div>
          </div>
          <div className="flx-center">
            <div>热度</div>
            <div>1321</div>
          </div>
          <div className="flx-center">
            <div>获赞</div>
            <div>6</div>
          </div>
        </div>
      </header>
      <main>
        <div>拥有角色</div>
      </main>
    </div>
  );
}

export default MyCreated;
