import React from 'react';
import Router from '@/router';
import './index.scss';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
import MrFooter from '@/components/mr-footer';

// HeaderIcon
const HeaderIcon = [
  { name: '夜间', id: '1', icon: 'evening-moon1' },
  { name: '全屏', id: '2', icon: 'un-full' },
  { name: '通知', id: '3', icon: 'notify' },
];

function Admin() {
  return (
    <Layout className="layout">
      <Header className="headerStyle">
        <MrHeader slotTitle="Magicrepokit" slotIcon={HeaderIcon} />
      </Header>
      <Layout
        hasSider
        style={{
          backgroundColor: '#fff',
        }}
      >
        <Sider className="siderStyle" width="280">
          <MrSidebar />
        </Sider>
        <Layout
          style={{
            minHeight: 'calc(100vh - 60px)',
            marginLeft: 300,
            backgroundColor: '#fff',
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
  );
}

export default Admin;
