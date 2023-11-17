import React, { useState, useEffect } from 'react';
import './index.scss';
import { Menu } from 'antd';
import {
  AlignLeftOutlined,
  TableOutlined,
  DashboardOutlined,
  SolutionOutlined,
  NumberOutlined,
  MessageFilled,
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

function MrSidebar(props) {
  const { mode } = props;
  const navigate = useNavigate();
  const handleClick = (e) => {
    const { key } = e;
    navigate(`${key}`);
  };
  const [theme, setTheme] = useState('mode');
  const [bgColor, setBgColor] = useState('');
  useEffect(() => {
    if (mode === 'default') {
      setTheme('light');
      setBgColor('#f5f5f5');
    } else {
      setTheme('dark');
      setBgColor('#242424');
    }
  }, [mode]);

  return (
    <Menu
      theme={theme}
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        height: '2200px',
      }}
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['superTable']}
      mode="inline"
      items={items}
    />
  );
}
export default MrSidebar;
