import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/utils/tools';
import { logout } from '@/utils/logout';
import routes from './routes';

function Router() {
  const { pathname } = useLocation();
  const accessToken = getAccessToken();

  const handleRedirect = (item) => {
    if (pathname === '/') {
      return <Navigate to="/admin" />;
    }
    if (pathname !== '/auth' && !accessToken) {
      //已授权页面，无token
      return <Navigate to="/auth" replace={true} />;
    } else {
      // 去登陆页面，清除信息
      if (pathname === '/auth') {
        logout();
      }
      // 已授权页面，有token
      return item.element;
    }
  };

  // 递归路由
  const RouteNav = (param) => {
    return param.map((item) => {
      return (
        <Route path={item.path} element={handleRedirect(item)} key={item.path}>
          {item.children && RouteNav(item.children)}
        </Route>
      );
    });
  };

  return <Routes>{RouteNav(routes)}</Routes>;
}

export default Router;
