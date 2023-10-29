import React from 'react';
import Router from '@/router';
import './index.scss';
import { Layout, theme } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
import MrFooter from '@/components/mr-footer';

const { useToken } = theme;
// HeaderIcon
const HeaderIcon = [
  // { name: '夜间', id: '1', icon: 'evening-moon1' },
  { name: '全屏', id: '2', icon: 'un-full' },
  { name: '通知', id: '3', icon: 'notify' },
];

function Admin() {
  const { token } = useToken();
  return (
    <Layout className="layout">
      <Header
        style={{ background: token.colorBgContainer }}
        className="headerStyle"
      >
        <MrHeader slotTitle="Magicrepokit" slotIcon={HeaderIcon} />
      </Header>
      <Layout hasSider style={{ background: token.colorBgContainer }}>
        <Sider
          style={{ background: token.colorBgContainer }}
          className="siderStyle"
          width="280"
        >
          <MrSidebar />
        </Sider>
        <Layout
          style={{
            minHeight: 'calc(100vh - 60px)',
            marginLeft: 300,
            background: token.colorBgContainer,
          }}
        >
          <Content className="contentStyle">
            {/* 路由出口 */}
            <Router />
          </Content>
          <Footer
            className="footerStyle"
            style={{ background: token.colorBgContainer }}
          >
            <MrFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Admin;
