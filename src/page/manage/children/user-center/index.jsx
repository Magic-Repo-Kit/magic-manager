import React, { useState, useContext } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import { IntlContext } from '@/components/IntlProvider'; // 国际化

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

function UserCenter() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const { currentIntl } = useContext(IntlContext);

  const items = [
    {
      label: currentIntl.formatMessage({ id: 'me.role' }),
      key: 'role-list',
    },
    {
      label: currentIntl.formatMessage({ id: 'me.my' }),
      key: 'my-role',
    },
    {
      label: currentIntl.formatMessage({ id: 'me.like' }),
      key: 'like',
    },
  ];

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
              <div className="user-account">
                {currentIntl.formatMessage({ id: 'me.account' })}：admin
              </div>
            </div>
          </div>

          <div className="user-sign">
            <span>{currentIntl.formatMessage({ id: 'me.introduce' })}</span>
            {/* <span>愿我有所发现、有所创造。</span> */}
            <EditOutlined />
          </div>
          <div className="user-medal user-select">
            <img src={Gold} alt="金勋章" />
            <img src={Silver} alt="银勋章" />
            <img src={Bronze} alt="铜勋章" />
          </div>

          <div className="user-follow user-select">
            <div>
              <span>10</span>
              <span>{currentIntl.formatMessage({ id: 'me.likes' })}</span>
            </div>
            <div>
              <span>185</span>
              <span>{currentIntl.formatMessage({ id: 'me.follow' })}</span>
            </div>
            <div>
              <span>31</span>
              <span>{currentIntl.formatMessage({ id: 'me.fans' })}</span>
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
