import React, { useState, useEffect } from 'react';
import './index.scss';
import { useSpring, animated } from 'react-spring';
import { fallLRIn } from '@/utils/animations';
import { Layout } from 'antd';
import { RollbackOutlined, AlignRightOutlined } from '@ant-design/icons';
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
  };
  const siderStyle = {
    color: '#fff',
    backgroundColor: '#292b2f',
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
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const fallIn = useSpring(fallLRIn);

  return (
    <animated.div style={fallIn}>
      <Layout>
        <Sider style={siderStyle}>
          <div className="slider-header">
            <RollbackOutlined
              style={{ fontSize: '23px' }}
              onClick={() => navigate('/home')}
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
        </Sider>
        <Content style={contentStyle}>
          <h2>{activeGroup.name}</h2>
          <ChatCtx />
          <footer className="container-footer">
            <FooterCtx />
          </footer>
        </Content>
        <Sider style={siderStyle}>
          <div className="slider-header">
            <div>当前在线</div>
          </div>
          <div className="slide-members">
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
        </Sider>
      </Layout>
    </animated.div>
  );
}
export default Chat;
