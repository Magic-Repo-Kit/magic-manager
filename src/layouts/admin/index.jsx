import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //渲染子路由
import { useLocation } from 'react-router-dom';
import './index.scss';
import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';

import { handleFullScreenClick } from '@/utils/tools';
import { Layout, theme, ConfigProvider } from 'antd';

const { Header, Sider, Content } = Layout;

function Admin() {
  const [mode, setMode] = useState('default');

  // headerIcons 按钮相关
  const handleNotificationClick = () => {
    console.log('Notification icon clicked');
  };
  const headerIcons = [
    {
      name: '夜间',
      id: '1',
      icon: 'evening-moon1',
      callback: () => setMode(mode === 'default' ? 'dark' : 'default'),
    },
    {
      name: '全屏',
      id: '2',
      icon: 'un-full',
      callback: handleFullScreenClick,
    },
    {
      name: '通知',
      id: '3',
      icon: 'notify',
      callback: handleNotificationClick,
    },
  ];
  const handleIconClick = (iconId) => {
    const clickedIcon = headerIcons.find((icon) => icon.id === iconId);
    if (clickedIcon) {
      clickedIcon.callback();
    }
  };

  // 主题监听
  useEffect(() => {
    if (mode === 'dark') {
      document.querySelector('.layout').style.background = '#242424';
      document.querySelector('.layout-content').style.background = '#242424';
      document.querySelector('.siderStyle').style.background = '#242424';
      document.querySelector('.contentStyle').style.background = '#242424';
    } else {
      //f5f5f5
      document.querySelector('.layout').style.background = '#f5f5f5';
      document.querySelector('.layout-content').style.background = '#f5f5f5';
      document.querySelector('.siderStyle').style.background = '#f5f5f5';
      document.querySelector('.contentStyle').style.background = '#f5f5f5';
    }
  }, [mode]);

  // chat页面隐藏slider
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const [marginLeft, SetMarginLeft] = useState('280px');

  useEffect(() => {
    if (location.pathname.includes('/chat')) {
      setOpacity(0);
      SetMarginLeft('0');
    } else {
      setOpacity(1);
      SetMarginLeft('280px');
    }
  }, [location]);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout className="layout">
        <Header className="headerStyle">
          <MrHeader
            slotTitle="Magicrepokit"
            slotIcon={headerIcons}
            mode={mode}
            onIconClick={(icon) => {
              handleIconClick(icon.id);
            }}
          />
        </Header>
        <Layout className="layout-content">
          <Sider className="siderStyle" width="280" style={{ opacity }}>
            <MrSidebar mode={mode} />
          </Sider>
          <Content className="contentStyle" style={{ marginLeft }}>
            {/* 渲染子路由 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Admin;
