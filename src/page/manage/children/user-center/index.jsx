import React, { useState } from 'react';
import './index.scss';
import RoleList from './role-list';
import MyCreated from './my-space';
import UserSetting from './user-setting';

import userHead from '@/assets/images/user-head.png';
import { Menu } from 'antd';

const items = [
  {
    label: '角色列表',
    key: 'roles-list',
  },
  {
    label: '我的空间',
    key: 'my-space',
  },
  {
    label: '设置',
    key: 'setting',
    // icon: <i className="iconfont mr-user--line"></i>,
  },
];

function UserCenter() {
  const [current, setCurrent] = useState('my-space');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="user-container">
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
          ) : current === 'my-space' ? (
            <MyCreated />
          ) : (
            <UserSetting />
          )}
        </div>
      </main>
    </div>
  );
}

export default UserCenter;
