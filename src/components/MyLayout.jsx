import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import viteLogo from '../../public/vite.svg';
import reactLogo from '../assets/react.svg';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
// import { context } from './AppProvider';

import Home from '../pages/home';
import TreeFiter from '../pages/superTable/treeFiter';
import SelectFiter from '../pages/superTable/selectFiter';
import Users from '../pages/user';

const { Header, Sider, Content } = Layout;

/**
 * 查找当前选中的menu菜单的值
 * @param key
 * @returns
 */
const findOpenKeys = (key, menus) => {
  const result = [];
  const findInfo = (arr) => {
    arr.forEach((item) => {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          findInfo(item.children); // 使用递归的方式查找当前页面刷新之后的默认选中项
        }
      }
    });
  };
  findInfo(menus);
  return result;
};

/**
 * 获取当前选中的数据的所有父节点
 * @param key
 * @returns
 */
const findDeepPath = (key, menus) => {
  const result = []; // 处理完所有的menu数据成为一个一维数组
  const findInfo = (arr) => {
    arr.forEach((item) => {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children); // 递归处理子节点
      }
    });
  };
  findInfo(menus);
  // 根据当前传递的key值过滤数据，获取到当前用来显示的menu item数据
  const tmpData = result.filter((item) => key.includes(item.key));
  if (tmpData.length > 0) {
    return [{ label: '首页', key: '/admin/dashboard' }, ...tmpData];
  }
  return [];
};

const MyLayout = ({ children }) => {
  const menus = [
    {
      key: '/admin/home',
      icon: <DashboardOutlined />,
      element: <Home />,
      label: '首页',
    },
    {
      key: '/admin/superTable',
      icon: <VideoCameraOutlined />,
      label: '超级表格',
      roles: ['admin', 'editor'],
      children: [
        {
          label: 'treeFiter',
          key: '/admin/superTable/treeFiter',
          element: <TreeFiter />,
          roles: ['admin'],
        },
        {
          label: 'selectFiter',
          key: '/admin/superTable/selectFiter',
          element: <SelectFiter />,
          roles: ['admin', 'editor'],
        },
      ],
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: '账号信息',
      element: <Users />,
      roles: ['admin', 'kf'],
    },
  ];
  // const { menus } = useContext(context);
  console.log('🚀 ~ file: MyLayout.jsx:63 ~ MyLayout ~ menus:', menus);
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname, menus);

  // 监听pathname的改变，重新这是面包屑数据
  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, menus));
  }, [pathname]);

  const classNamesLogo = `logo ${collapsed ? 'logo-rotate' : ''}`;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="container">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="container-title flx-center">
          <img
            src={collapsed ? reactLogo : viteLogo}
            className={classNamesLogo}
            alt="Vite logo"
          />
          <span style={{ display: collapsed ? 'none' : 'block' }}>
            MagicRepokit
          </span>
        </div>
        <Menu
          onClick={({ key }) => {
            // alert(key);
            navigate(key);
          }}
          mode="inline"
          defaultSelectedKeys={tmpOpenKeys}
          defaultOpenKeys={tmpOpenKeys}
          items={menus}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              background: colorBgContainer,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'auto',
            flex: 1,
          }}
        >
          百宝袋管理系统
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
