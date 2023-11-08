import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import AdminLayout from '@/layouts/admin';
import AuthLayout from '@/layouts/auth';
import FailLayout from '@/layouts/fail';

import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from '@/utils/tools';

function App() {
  const navigate = useNavigate();
  // 判断登陆状态 重定向
  useEffect(() => {
    const accessToken = getAccessToken();
    // 检查token是否存在
    if (accessToken) {
      // 已登录每次跳转到登录页面清除token
      if (location.pathname === '/auth') {
        removeAccessToken();
        removeRefreshToken();
      }
    } else {
      // 未登录，跳转到登录页面
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="fail/*" element={<FailLayout />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
}

export default App;
