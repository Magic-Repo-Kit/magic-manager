import React, { useState, useEffect } from 'react';
import './index.scss';
import { useSpring, animated } from 'react-spring';
import { fallLRIn } from '@/utils/animations';
import { Layout } from 'antd';
import {
  RollbackOutlined,
  AlignRightOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import userHead from '@/assets/headIcon/head-3.svg';

import ChatCtx from './chat-ctx';
import FooterCtx from './footer-ctx';

const { Header, Footer, Sider, Content } = Layout;

function Chat() {
  const navigate = useNavigate();
  const contentStyle = {
    color: '#fff',
    backgroundColor: '#2f3236',
    height: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
  };
  const siderStyle = {
    color: '#fff',
    backgroundColor: '#292b2f',
    height: 'calc(100vh - 60px)',
  };
  const groups = [
    {
      id: 1,
      name: 'Group 1',
    },
    {
      id: 2,
      name: 'Group 2',
    },
    {
      id: 3,
      name: 'Group 3',
    },
    {
      id: 4,
      name: 'Chatgpt 3',
    },
    {
      id: 5,
      name: 'Chatgpt 4',
    },
  ];
  const members = [
    {
      id: 1,
      name: 'Mark',
      icon: 'head-1.svg',
    },
    {
      id: 2,
      name: 'Iris',
      icon: 'head-3',
    },
    {
      id: 3,
      name: '树懒',
      icon: 'head-2',
    },
    {
      id: 4,
      name: '小美',
      icon: 'head-18',
    },
    {
      id: 5,
      name: '这个男人',
      icon: 'head-10',
    },
    {
      id: 6,
      name: '阿黄',
      icon: 'head-6',
    },
  ];
  const [activeGroup, setActiveGroup] = useState(
    sessionStorage.getItem('activeGroup') || groups[0]
  );
  const fallIn = useSpring(fallLRIn);

  // 在组件挂载时，从 sessionStorage 中恢复 activeGroup 的值
  useEffect(() => {
    const savedActiveGroup = sessionStorage.getItem('activeGroup');
    if (savedActiveGroup) {
      const parsedActiveGroup = JSON.parse(savedActiveGroup);
      setActiveGroup(parsedActiveGroup);
    }
  }, []);
  // 在 activeGroup 改变时，保存 activeGroup 到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem('activeGroup', JSON.stringify(activeGroup));
  }, [activeGroup]);

  // 搜索 input框
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };
  return (
    <animated.div style={fallIn}>
      <Layout>
        <Sider style={siderStyle}>
          <div className="slider-box">
            <div className="slider-header user-select">
              <RollbackOutlined
                style={{ fontSize: '23px' }}
                onClick={() => navigate(-1)}
              />
              <AlignRightOutlined style={{ fontSize: '23px' }} />
            </div>
            <div className="slide-groups">
              {groups.map((group) => {
                return (
                  <div
                    key={group.id}
                    className={group.id === activeGroup.id ? 'active' : ''}
                    onClick={() => setActiveGroup(group)}
                  >
                    # {group.name}
                  </div>
                );
              })}
            </div>
          </div>
        </Sider>
        <Content style={contentStyle}>
          <div
            className="flx-justify-between"
            style={{ padding: '0 20px 0 30px' }}
          >
            <h2>{activeGroup.name}</h2>
            <div className={`input-container ${focused ? 'focused' : ''}`}>
              <input
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="input-ctx"
                placeholder="搜索"
                value={searchValue}
                onChange={handleChange}
                style={{ border: 'none !important' }}
              />
              {searchValue ? (
                <i
                  className="iconfont mr-fork-1 icon-ctx"
                  onClick={handleClear}
                ></i>
              ) : (
                <i className="iconfont mr-search-1 icon-ctx"></i>
              )}
            </div>
          </div>

          <ChatCtx className="container-ctx" />
          <footer className="container-footer">
            <FooterCtx />
          </footer>
        </Content>
        <Sider style={siderStyle}>
          <div className="slider-box">
            <div className="slider-header user-select">
              <div>在线状态</div>
              {/* <i
                className="iconfont mr-wangluozaixianbaozheng"
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#00d726',
                  transform: ' translateY(-3px)',
                }}
              ></i> */}
              <div>
                <QuestionCircleOutlined
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    filter: 'grayscale(100%)',
                  }}
                />
                <RedoOutlined
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginLeft: '8px',
                  }}
                />
              </div>
            </div>

            <div className="slide-members">
              <span>管理员 - 6</span>
              {members.map((member) => {
                return (
                  <div key={member.id}>
                    <div className="slide-member-icon flx-center">
                      <img src={userHead} height="28" />
                    </div>
                    <div>{member.name}</div>
                  </div>
                );
              })}
              <span>群成员 - 30</span>
              {members.map((member) => {
                return (
                  <div key={member.id}>
                    <div className="slide-member-icon flx-center">
                      <img src={userHead} height="28" />
                    </div>
                    <div>{member.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Sider>
      </Layout>
    </animated.div>
  );
}
export default Chat;
