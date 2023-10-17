import { createContext, useEffect, useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import Home from '@/views/home';
import TreeFiter from '@/views/superTable/treeFiter';
import SelectFiter from '@/views/superTable/selectFiter';
import Users from '@/views/user';

export const context = createContext({});

// 如果需要再加新的页面，只需要写好组件之后 改这个数组就好
const sideMenuData = [
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
/**
 * 根据role角色生成侧边栏菜单
 * @param role
 * @returns
 */
function findRoles(role) {
  const arr = [];
  // findInfo(sideMenuData);
  function findInfo(data, parent = null) {
    data.forEach((item) => {
      const { children, ...info } = item;
      if (children) {
        info.children = [];
        findInfo(children, info.children);
        info.children.length == 0 ? delete info.children : null;
      }
      if (info.roles) {
        if (info.roles?.includes(role))
          parent ? parent.push(info) : arr.push(info);
      } else {
        parent ? parent.push(info) : arr.push(info);
      }
    });
  }

  return arr;
}

/**
 * 根据侧边栏实现路由信息的扁平化处理
 * @param menus
 * @returns
 */
function flatRoutes(menus) {
  const arr = [];
  function findInfo(data) {
    data.forEach((item) => {
      const { children, ...info } = item;
      arr.push(info);
      if (children) {
        findInfo(children);
      }
    });
  }
  findInfo(menus);
  return arr;
}

function AppProvider({ children }) {
  // 初始化的时候从本地存储获取角色信息
  let defaultMenus = [];
  let defaultRoutes = [];
  const oldRole = sessionStorage.getItem('role');
  if (oldRole) {
    defaultMenus = findRoles(oldRole);
    defaultRoutes = flatRoutes(defaultMenus);
  }
  const [menus, setMenus] = useState(defaultMenus);
  const [routes, setRoutes] = useState(defaultRoutes);

  // 根据当前的角色生成路由数组和侧边栏数组
  const resetMenus = (role) => {
    sessionStorage.setItem('role', role);
    // 此处重置菜单和路由数据
    const tmpMenu = findRoles(role);
    setMenus(tmpMenu);
    setRoutes(flatRoutes(tmpMenu));
  };
  return (
    <context.Provider value={{ menus, routes, resetMenus }}>
      {children}
    </context.Provider>
  );
}

export default AppProvider;
