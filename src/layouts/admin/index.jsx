import React, { useState, useEffect } from 'react';
import Router from '@/router';
import './index.scss';
import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
import MrFooter from '@/components/mr-footer';
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
      console.log(token.colorPrimaryBg);
      document.querySelector('.headerStyle').style.background = '#333'; // 替换为你想要的夜间模式下的背景颜色
      document.querySelector('.siderStyle').style.background = '#222'; // 替换为你想要的夜间模式下的背景颜色
    } else {
      console.log(theme.algorithm);
      document.querySelector('.headerStyle').style.background = '#f0f2f5'; // 替换为你想要的默认模式下的背景颜色
      document.querySelector('.siderStyle').style.background = '#fff'; // 替换为你想要的默认模式下的背景颜色
    }
  }, [mode]);

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
          <Sider className="siderStyle" width="280">
            <MrSidebar />
          </Sider>
          <Layout
            style={{
              minHeight: 'calc(100vh - 60px)',
              marginLeft: 300,
            }}
          >
            <Content className="contentStyle">
              {/* 路由出口 */}
              <Router />
            </Content>
            <Footer className="footerStyle">
              <MrFooter />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Admin;
