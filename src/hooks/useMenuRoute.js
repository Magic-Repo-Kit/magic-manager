// 联动antd菜单 与 路由 

import { useLocation, useNavigate } from 'react-router-dom';

function useMenuRoute(index) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathItems = pathname.split('/');
  const pathItem = pathItems[index] || '';

  const setPathItem = (newItemKey) => {
    // 补全路径
    const parentPath = pathItems.slice(0, index).join('/');
    // 导航至完整路径
    navigate(`${parentPath}/${newItemKey}`);
  };

  return [pathItem, setPathItem];
}

export default useMenuRoute;
