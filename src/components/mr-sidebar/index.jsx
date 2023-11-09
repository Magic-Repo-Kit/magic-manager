import React, { useState, useEffect } from 'react';
import './index.scss';
import { Menu } from 'antd';
import {
  AlignLeftOutlined,
  TableOutlined,
  DashboardOutlined,
  SolutionOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('首页', 'home', <AlignLeftOutlined />),
  getItem('超级表格', 'superTable', <TableOutlined />, [
    getItem('TreeFiter', 'tree-fiter'),
    getItem('SelectFiter', 'select-fiter'),
  ]),
  getItem('dashboard', 'dashboard', <DashboardOutlined />, [
    getItem('ChartBoard', 'chart-board'),
    getItem('ImgBoard', 'img-board'),
  ]),

  getItem('用户管理', 'users', <SolutionOutlined />),
  getItem('关于', 'about', <NumberOutlined />),
];

function MrSidebar(props) {
  const { mode } = props;
  const navigate = useNavigate();
  const handleClick = (e) => {
    const { key } = e;
    navigate(`/admin/${key}`);
  };
  const [theme, setTheme] = useState('mode');
  useEffect(() => {
    if (mode === 'default') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [mode]);
  return (
    <Menu
      theme={theme}
      onClick={handleClick}
      style={{
        width: 260,
      }}
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['superTable']}
      mode="inline"
      items={items}
    />
  );
}
export default MrSidebar;
