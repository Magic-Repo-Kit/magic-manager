import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd'; //加载中
// 避免闪屏
const lazyLoad = (component) => {
  return (
    <Suspense
      fallback={
        <Spin
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      }
    >
      {component}
    </Suspense>
  );
};

// AdminLayout不需要懒加载
import AdminLayout from '@/layouts/admin';
// 导入组件(懒加载)
const AuthLayout = lazy(() => import('@/layouts/auth'));
const FailLayout = lazy(() => import('@/layouts/fail'));
const Home = lazy(() => import('@/page/home'));
const ChatMagic = lazy(() => import('@/page/chat-magic'));
const ChatGPT = lazy(() => import('@/page/chat-gpt'));

const TreeFiter = lazy(() => import('@/page/superTable/children/treeFiter'));
const SelectFiter = lazy(() =>
  import('@/page/superTable/children/selectFiter')
);
const ChartBoard = lazy(() => import('@/page/databoard/chartBoard'));
const ImgBoard = lazy(() => import('@/page/databoard/imgBoard'));

// 用户管理
const UsersAdmin = lazy(() => import('@/page/users/children/users-admin'));
const RolesAdmin = lazy(() => import('@/page/users/children/roles-admin'));
const LoginLog = lazy(() => import('@/page/users/children/login-log'));

const About = lazy(() => import('@/page/about'));

const routes = [
  // 通过权限页面
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
        path: 'chat-magic',
        element: lazyLoad(<ChatMagic />),
        children: [],
      },
      {
        path: 'chat-gpt',
        element: lazyLoad(<ChatGPT />),
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
      // 用户管理
      {
        path: 'users-admin',
        element: lazyLoad(<UsersAdmin />),
      },
      {
        path: 'roles-admin',
        element: lazyLoad(<RolesAdmin />),
      },
      {
        path: 'login-log',
        element: lazyLoad(<LoginLog />),
      },

      {
        path: 'about',
        element: lazyLoad(<About />),
      },
    ],
  },
  // 鉴权
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
