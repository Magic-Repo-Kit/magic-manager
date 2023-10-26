import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MrHeader from '@/components/mr-header';
import MrSidebar from '@/components/mr-sidebar';
import MrFooter from '@/components/mr-footer';

import Home from '@/views/home';

import { totalRoutes } from '@/router';

// 样式
const headerStyle = {
  zIndex: 1,
  position: 'sticky',
  top: 0,
  height: '60px',
  background: 'rgba(255, 255, 255, 0.7)',
  backgroundClip: 'padding-box',
  boxShadow:
    '0 1px 2px 0 rgba(0,0,0,.03), 0 1px 6px -1px rgba(0,0,0,.02), 0 2px 4px 0 rgba(0,0,0,.02)',
  backdropFilter: 'blur(24px)',
};
const siderStyle = {
  overflow: 'auto',
  position: 'fixed',
  left: 0,
  height: 'calc(100% - 90px)',
  width: '300',
  padding: '12px 10px',
  marginTop: '30px',
  backgroundColor: '#fff',
  borderInlineEnd: '1px solid rgba(5, 5, 5, 0.06)',
};
const contentStyle = {
  overflow: 'auto',
  padding: '0 50px',
  backgroundColor: '#fff',
  marginTop: '30px',
};
const footerStyle = {
  textAlign: 'center',
  height: '65px',
  backgroundColor: '#fff',
};

// HeaderIcon
const HeaderIcon = [
  { name: '夜间', id: '1', icon: 'evening-moon1' },
  { name: '全屏', id: '2', icon: 'un-full' },
  { name: '通知', id: '3', icon: 'notify' },
];

function Admin(props) {
  return (
    <Layout>
      <Header style={headerStyle}>
        <MrHeader slotTitle="Magicrepokit" slotIcon={HeaderIcon} />
      </Header>
      <Layout hasSider style={{ backgroundColor: '#fff' }}>
        <Sider style={siderStyle} width="280">
          <MrSidebar />
        </Sider>
        <Layout
          style={{
            minHeight: 'calc(100vh - 60px)',
            marginLeft: 300,
            backgroundColor: '#fff',
          }}
        >
          <Content style={contentStyle}>
            <Home />
          </Content>
          <Footer style={footerStyle}>
            <MrFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Admin;
