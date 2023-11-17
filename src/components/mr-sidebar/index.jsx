import React, { useState, useEffect } from 'react';
import './index.scss';
import { Menu } from 'antd';
import menus from './menus';

import { useNavigate } from 'react-router-dom';
import useMenuRoute from '@/hooks/useMenuRoute';

function MrSidebar(props) {
  const { mode } = props;
  const navigate = useNavigate();

  // 该菜单管理一级路由，因此传入的参数为 1
  const [selectedKey, setSelectedKey] = useMenuRoute(1);
  const handleClick = (e) => {
    const { key } = e;
    navigate(`${key}`);
  };

  // 主题相关
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
      // onSelect={({ key }) => setSelectedKey(key)}
      // selectedKeys={[selectedKey]}
      mode="inline"
      items={menus}
    />
  );
}
export default MrSidebar;
