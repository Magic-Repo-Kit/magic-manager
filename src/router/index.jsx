import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd'; //加载中
import { getAccessToken } from '@/utils/tools';
import { logout } from '@/utils/logout';

// AdminLayout不需要懒加载
import AdminLayout from '@/layouts/admin';
// 导入组件(懒加载)
const AuthLayout = lazy(() => import('@/layouts/auth'));
const FailLayout = lazy(() => import('@/layouts/fail'));
const Home = lazy(() => import('@/page/home'));
const Chat = lazy(() => import('@/page/chat'));
const TreeFiter = lazy(() => import('@/page/superTable/children/treeFiter'));
const SelectFiter = lazy(() =>
  import('@/page/superTable/children/selectFiter')
);
const ChartBoard = lazy(() => import('@/page/databoard/chartBoard'));
const ImgBoard = lazy(() => import('@/page/databoard/imgBoard'));
const Users = lazy(() => import('@/page/users'));
const About = lazy(() => import('@/page/about'));

// 避免闪屏
const lazyLoad = (component) => {
  return <Suspense fallback={<Spin />}>{component}</Suspense>;
};

function Router() {
  const location = useLocation();
  const { pathname } = location;
  const accessToken = getAccessToken();

  const routes = [
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        // 空路径 匹配 "/admin" 重定向到 "/admin/home"
        {
          path: '',
          element: <Navigate to="home" />,
        },
        {
          path: 'home',
          element: lazyLoad(<Home />),
        },
        {
          path: 'chat',
          element: lazyLoad(<Chat />),
          children: [],
        },
        {
          path: 'tree-fiter',
          element: lazyLoad(<TreeFiter />),
        },
        {
          path: 'select-fiter',
          element: lazyLoad(<SelectFiter />),
        },
        {
          path: 'chart-board',
          element: lazyLoad(<ChartBoard />),
        },
        {
          path: 'img-board',
          element: lazyLoad(<ImgBoard />),
        },
        {
          path: 'users',
          element: lazyLoad(<Users />),
        },
        {
          path: 'about',
          element: lazyLoad(<About />),
        },
      ],
    },
    {
      path: 'auth',
      element: <AuthLayout />,
    },
    {
      path: '*',
      element: <FailLayout />,
    },
  ];

  const handleRedirect = (item) => {
    if (pathname === '/') {
      return <Navigate to="/admin" />;
    }
    if (pathname !== '/auth' && !accessToken) {
      //已授权页面，无token
      return <Navigate to="/auth" replace={true} />;
    } else {
      // 去登陆页面，清除信息
      if (pathname === '/auth') {
        logout();
      }
      // 已授权页面，有token
      return item.element;
    }
  };

  const RouteNav = (param) => {
    return param.map((item) => {
      return (
        <Route path={item.path} element={handleRedirect(item)} key={item.path}>
          {item.children && RouteNav(item.children)}
        </Route>
      );
    });
  };

  return <Routes>{RouteNav(routes)}</Routes>;
}

export default Router;
