// 登陆授权页面
import Login from '@/layouts/auth';

// 异常页面
import Fail from '@/layouts/fail';

// antd图标
import { SettingOutlined, RocketFilled } from '@ant-design/icons';

// 菜单对应页面
import Home from '@/views/home';
import TreeFiter from '@/views/superTable/treeFiter';
import SelectFiter from '@/views/superTable/selectFiter';
import ChartBoard from '@/views/databoard/chartBoard';
import ImgBoard from '@/views/databoard/imgBoard';
import Users from '@/views/users';
import About from '@/views/about';

// 全部路由
const totalRoutes = [
  {
    name: '首页',
    layout: '/admin',
    path: 'home',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <Home />,
  },
  {
    name: '超级表格-tree',
    layout: '/admin',
    path: 'superTable/treeFiter',
    icon: <SettingOutlined style={{ fontSize: '20px' }} />,
    component: <TreeFiter />,
    secondary: true,
  },
  {
    name: '超级表格-select',
    layout: '/admin',
    path: 'superTable/selectFiter',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <SelectFiter />,
    secondary: true,
  },
  {
    name: '超级表格-select',
    layout: '/admin',
    path: 'superTable/selectFiter',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <SelectFiter />,
    secondary: true,
  },
  {
    name: '仪表盘',
    layout: '/admin',
    path: 'databoard/chartBoard',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <ImgBoard />,
    secondary: true,
  },
  {
    name: '图表盘',
    layout: '/admin',
    path: 'databoard/imgBoard',
    icon: <SettingOutlined style={{ fontSize: '20px' }} />,
    component: <ChartBoard />,
    secondary: true,
  },
  {
    name: '用户管理',
    layout: '/admin',
    path: 'users',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <Users />,
  },
  {
    name: '关于',
    layout: '/admin',
    path: 'about',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <About />,
  },
];

// 登陆授权页
const authRoutes = [
  {
    name: '登陆',
    layout: '/auth',
    path: 'auth/login',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <Login />,
  },
];

// 无权访问提示页

const offlineRoutes = [
  {
    name: '异常',
    layout: '/fail',
    path: 'fail',
    icon: <RocketFilled style={{ fontSize: '20px' }} />,
    component: <Fail />,
  },
];

export { totalRoutes, authRoutes, offlineRoutes };
