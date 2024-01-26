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

// 工作台
const Manage = lazy(() => import('@/page/manage'));
const WorkPlatform = lazy(() => import('@/page/manage/children/work-platform'));

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

const ChatMenu = lazy(() => import('@/page/chat'));
const GPT = lazy(() => import('@/page/gpt'));
const AiHelper = lazy(() => import('@/page/ai-helper'));

// 路由
const routes = [
  // 通过权限页面
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      // 空路径 匹配 "/admin" 重定向到 "/admin/home"
      {
        path: '',
        element: <Navigate to="manage" replace />,
      },
      // 工作台
      {
        path: 'manage',
        element: lazyLoad(<Manage />),
        children: [
          {
            path: '',
            element: (
              <Navigate
                to={sessionStorage.getItem('manageMenuUrl') || 'work-platform'}
                replace
              />
            ), //默认工作台首页
          },
          {
            path: 'work-platform',
            element: lazyLoad(<WorkPlatform />),
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
          // 个人中心
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
      // 闪聊
      {
        path: 'chat',
        element: lazyLoad(<ChatMenu />),
        children: [],
      },
      // 一问一答
      {
        path: 'gpt',
        element: lazyLoad(<GPT />),
        children: [],
      },
      // AI助手
      {
        path: 'ai-helper',
        element: lazyLoad(<AiHelper />),
        children: [],
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
