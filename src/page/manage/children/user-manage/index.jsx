import React, { useState } from 'react';
import './index.scss';
import RoleList from './role-list';
import MyCreated from './my-created';
import UserSetting from './user-setting';

import userHead from '@/assets/images/user-head.png';
import { Menu } from 'antd';

const items = [
  {
    label: '角色列表',
    key: 'roles-list',
  },
  {
    label: '我的创建',
    key: 'my-created',
  },
  {
    label: '设置',
    key: 'setting',
    // icon: <i className="iconfont mr-user--line"></i>,
  },
];

function UserManage() {
  const [current, setCurrent] = useState('roles-list');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="user-container">
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
        <div className="user-main-menu">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </div>
        <div className="user-main-content">
          {current === 'roles-list' ? (
            <RoleList />
          ) : current === 'my-created' ? (
            <MyCreated />
          ) : (
            <UserSetting />
          )}
        </div>
      </main>
    </div>
  );
}

export default UserManage;
