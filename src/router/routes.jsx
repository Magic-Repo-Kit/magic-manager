import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd'; //加载中
// 避免闪屏
const lazyLoad = (component) => {
  return <Suspense fallback={<Spin />}>{component}</Suspense>;
};

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
  // 找不到上面的，则匹配404
  {
    path: '*',
    element: <FailLayout />,
  },
];

export default routes;
