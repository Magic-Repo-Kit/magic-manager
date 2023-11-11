import React, { useState, useEffect } from 'react';
import Router from '@/router';
import { useLocation } from 'react-router-dom';
import './index.scss';
import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
// import MrFooter from '@/components/mr-footer';
import { handleFullScreenClick } from '@/utils/tools';
import { Layout, theme, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;

function Admin() {
  const { token } = useToken();
  const [mode, setMode] = useState('default');

  // headerIcons
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

  // 当 mode 发生变化时，更新 Header 和 Content 的背景颜色
  useEffect(() => {
    if (mode === 'dark') {
      document.querySelector('.headerStyle').style.background = '#001529';
      document.querySelector('.siderStyle').style.background = '#141414';
    } else {
      // console.log(token.colorPrimaryBg);
      document.querySelector('.headerStyle').style.background = '#ffffff';
      document.querySelector('.siderStyle').style.background = '#f5f5f5';
    }
  }, [mode]);

  // chat页面隐藏slider
  const location = useLocation();
  const [width, setWidth] = useState('280');
  const [marginLeft, SetMarginLeft] = useState('300px');
  useEffect(() => {
    if (location.pathname.includes('/chat')) {
      setWidth('0');
      SetMarginLeft('0');
    } else {
      setWidth('280');
      SetMarginLeft('300px');
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
        <Layout hasSider>
          <Sider
            className="siderStyle"
            width={width}
            // style={{ opacity: opacity }}
          >
            <MrSidebar mode={mode} />
          </Sider>
          <Layout
            style={{
              minHeight: 'calc(100vh - 60px)',
              marginLeft: marginLeft,
            }}
          >
            <Content className="contentStyle">
              {/* 路由出口 */}
              <Router />
            </Content>
            {/* <Footer className="footerStyle">
              <MrFooter />
            </Footer> */}
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Admin;
