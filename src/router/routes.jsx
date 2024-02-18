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

// 结构路由(懒加载)
// import AdminLayout from '@/layouts/admin';
const AdminLayout = lazy(() => import('@/layouts/admin'));
const AuthLayout = lazy(() => import('@/layouts/auth'));
const FailLayout = lazy(() => import('@/layouts/fail'));

const Manage = lazy(() => import('@/page/manage'));

// 发现
const Discover = lazy(() => import('@/page/manage/children/discover'));

// 知识库
const Knowledge = lazy(() => import('@/page/manage/children/knowledge'));
const KnowledgeList = lazy(() =>
  import('@/page/manage/children/knowledge/children/list')
);
const KnowledgeDetail = lazy(() =>
  import('@/page/manage/children/knowledge/children/detail')
);

// 创建角色预览
const CreatePreview = lazy(() =>
  import('@/page/manage/children/create-preview')
);
const CreateRoles = lazy(() =>
  import('@/page/manage/children/create-preview/children/create')
);
const PreviewRoles = lazy(() =>
  import('@/page/manage/children/create-preview/children/preview')
);
// 对话
const Chat = lazy(() => import('@/page/manage/children/chat'));

// 角色列表

const UserCenter = lazy(() => import('@/page/manage/children/user-center'));
const RolesManage = lazy(() => import('@/page/manage/children/roles-manage'));
const ContactUs = lazy(() => import('@/page/manage/children/contact-us'));
const SettingManage = lazy(() =>
  import('@/page/manage/children/setting-manage')
);

// 路由
const routes = [
  // 通过权限页面
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      // 空路径 匹配 "/admin" 重定向到 "/admin/manage"
      {
        path: '',
        element: <Navigate to="manage" replace />,
      },
      // 工作台
      {
        path: 'manage',
        element: lazyLoad(<Manage />),
        children: [
          //默认路由
          {
            path: '',
            element: (
              <Navigate
                to={sessionStorage.getItem('manageMenuUrl') || 'discover'}
                replace
              />
            ),
          },
          // 发现
          {
            path: 'discover',
            element: lazyLoad(<Discover />),
          },
          // 知识库
          {
            path: 'knowledge',
            element: lazyLoad(<Knowledge />),
            children: [
              {
                path: '',
                element: <Navigate to={'list'} replace />, //默认list
              },
              {
                path: 'list',
                element: lazyLoad(<KnowledgeList />),
              },
              {
                path: 'detail',
                element: lazyLoad(<KnowledgeDetail />),
              },
            ],
          },
          // 创建角色预览
          {
            path: 'create-preview',
            element: lazyLoad(<CreatePreview />),
            children: [
              {
                path: '',
                element: <Navigate to={'create'} replace />, //默认create
              },
              {
                path: 'create',
                element: lazyLoad(<CreateRoles />),
              },
              {
                path: 'preview',
                element: lazyLoad(<PreviewRoles />),
              },
            ],
          },
          // 聊天
          {
            path: 'chat',
            element: lazyLoad(<Chat />),
          },
          // 我
          {
            path: 'user-center',
            element: lazyLoad(<UserCenter />),
          },
          // 权限管理
          {
            path: 'roles-manage',
            element: lazyLoad(<RolesManage />),
          },
          // 联系我们
          {
            path: 'contact-us',
            element: lazyLoad(<ContactUs />),
          },
          // 工作台设置
          {
            path: 'setting-manage',
            element: lazyLoad(<SettingManage />),
          },
        ],
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
