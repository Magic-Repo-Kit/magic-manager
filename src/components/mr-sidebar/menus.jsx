import {
  AlignLeftOutlined,
  TableOutlined,
  DashboardOutlined,
  SolutionOutlined,
  NumberOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const menus = [
  getItem(
    <span style={{ fontSize: '14px' }}>首页</span>,
    'home',
    <AlignLeftOutlined className="slider-menu-icon" />
  ),
  getItem(
    <span style={{ fontSize: '14px' }}>chatMagic</span>,
    'chat',
    <i className="iconfont mr-shejishi slider-menu-icon"></i>
  ),
  getItem(
    <span style={{ fontSize: '14px' }}>超级表格</span>,
    'superTable',
    <TableOutlined className="slider-menu-icon" />,
    [getItem('TreeFiter', 'tree-fiter'), getItem('SelectFiter', 'select-fiter')]
  ),
  getItem(
    'dashboard',
    'dashboard',
    <DashboardOutlined className="slider-menu-icon" />,
    [getItem('ChartBoard', 'chart-board'), getItem('ImgBoard', 'img-board')]
  ),
  getItem(
    <span style={{ fontSize: '14px' }}>用户管理</span>,
    'users',
    <SolutionOutlined className="slider-menu-icon" />
  ),
  getItem(
    <span style={{ fontSize: '14px' }}>关于</span>,
    'about',
    <NumberOutlined className="slider-menu-icon" />
  ),
];

export default menus;
