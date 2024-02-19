import React, { useState, useContext } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import RoleList from './role-list';
import MyRole from './my-role';
import Like from './like';

// 图片
import userHead from '@/assets/images/user-head.png';
import Gold from '@/assets/images/medal-gold.png';
import Silver from '@/assets/images/medal-silver.png';
import Bronze from '@/assets/images/medal-bronze.png';

import { Menu, Affix } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const items = [
  {
    label: '角色',
    key: 'role-list',
  },
  {
    label: '我的',
    key: 'my-role',
  },
  {
    label: '赞过',
    key: 'like',
  },
];

function UserCenter() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [current, setCurrent] = useState('role-list');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className={`user-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="user-head">
          <img src={userHead} />
        </div>
        <div className="user-info">
          <div className="user-info-mobile">
            <div className="user-head-mobile">
              <img src={userHead} />
            </div>
            <div>
              <div className="user-name">Mark</div>
              <div className="user-account">账号：admin</div>
            </div>
          </div>

          <div className="user-sign">
            <span>点击添加介绍，让大家认识你。</span>
            <EditOutlined />
          </div>
          {/* <div className="user-info-btn">编辑资料</div> */}
          {/* <div className="user-sign">愿我有所发现、有所创造。</div> */}
          <div className="user-medal user-select">
            <img src={Gold} alt="金勋章" />
            <img src={Silver} alt="银勋章" />
            <img src={Bronze} alt="铜勋章" />
          </div>

          <div className="user-follow user-select">
            <div>
              <span>10</span>
              <span>获赞</span>
            </div>
            <div>
              <span>185</span>
              <span>关注</span>
            </div>
            <div>
              <span>31</span>
              <span>粉丝</span>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Affix offsetTop={55}>
          <div className="user-main-menu user-select">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              className="user-main-menu-content"
            />
          </div>
        </Affix>

        <div className="user-main-content">
          {current === 'role-list' ? (
            <RoleList />
          ) : current === 'my-role' ? (
            <MyRole />
          ) : (
            <Like />
          )}
        </div>
      </main>
    </div>
  );
}

export default UserCenter;
