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

import ChatCtx from './chat-ctx';
import FooterCtx from './footer-ctx';

const { Header, Footer, Sider, Content } = Layout;

function Chat() {
  const navigate = useNavigate();

  const contentStyle = {
    color: '#fff',
    backgroundColor: '#2f3236',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };
  const siderStyle = {
    color: '#fff',
    backgroundColor: '#292b2f',
    height: '100vh',
    width: '200px',
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

  const [siderWidth, setSiderWidth] = useState(250);
  const handleSiderWidth = () => {
    if (siderWidth === 250) {
      setSiderWidth(0);
    } else {
      setSiderWidth(250);
    }
  };
  return (
    <animated.div style={fallIn}>
      <Layout>
        <Sider style={siderStyle} width={siderWidth}>
          <div className="slider-box">
            <div className="slider-header user-select">
              <RollbackOutlined
                style={{ fontSize: '23px' }}
                onClick={() => navigate('/')}
              />
              {/* <AlignRightOutlined style={{ fontSize: '23px' }} /> */}
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
            className="user-select"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
            }}
          >
            <AlignRightOutlined
              className="click-scale"
              style={{
                fontSize: '23px',
                marginRight: '10px',
                cursor: 'pointer',
                position: 'absolute',
                transform: siderWidth === 0 ? 'scaleX(-1)' : '',
              }}
              onClick={() => handleSiderWidth()}
            />
            <h2 style={{ textAlign: 'center', flex: '1' }}>
              {activeGroup.name}
            </h2>
          </div>

          <ChatCtx className="container-ctx" />
          <footer className="container-footer">
            <FooterCtx />
          </footer>
        </Content>
      </Layout>
    </animated.div>
  );
}
export default Chat;
