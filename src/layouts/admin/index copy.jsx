import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //渲染子路由
import { useLocation } from 'react-router-dom';
import './index.scss';
// import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
import MrCard from '@/components/mr-card';

import { handleFullScreenClick } from '@/utils/tools';
import { Layout, theme, ConfigProvider } from 'antd';

const { Header, Sider, Content } = Layout;

function Admin() {
  const [mode, setMode] = useState('default');
  const [showShadow, setShowShadow] = useState(false);

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
    // {
    //   name: '退出',
    //   id: '4',
    //   icon: 'leave-1',
    //   callback: () => window.location.replace('/auth'),
    // },
  ];
  // const handleIconClick = (iconId) => {
  //   const clickedIcon = headerIcons.find((icon) => icon.id === iconId);
  //   if (clickedIcon) {
  //     clickedIcon.callback();
  //   }
  // };

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

  // chat页面隐藏slider header
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const [marginLeft, SetMarginLeft] = useState('280px');
  const [isDisplay, SetIsDisplay] = useState('block');
  useEffect(() => {
    if (
      location.pathname.includes('/chat-magic') ||
      location.pathname.includes('/chat-gpt')
    ) {
      setOpacity(0);
      SetMarginLeft('0');
      SetIsDisplay('none');
    } else {
      setOpacity(1);
      SetMarginLeft('280px');
    }
  }, [location]);

  // 监听屏幕滚动
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout className="layout">
        <Header
          className={showShadow ? 'headerStyle' : 'headerStyle header-shadow'}
          style={{ display: isDisplay }}
        >
          {/* <MrHeader
            slotTitle="Magicrepokit"
            slotIcon={headerIcons}
            mode={mode}
            onIconClick={(icon) => {
              handleIconClick(icon.id);
            }}
          /> */}
        </Header>
        <Layout className="layout-content">
          <Sider className="siderStyle" width="280" style={{ opacity }}>
            <MrSidebar mode={mode} />
            <div style={{ height: '320px' }}></div>
            <MrCard mode={mode} />
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
