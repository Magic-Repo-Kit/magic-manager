import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import AdminLayout from '@/layouts/admin';
import AuthLayout from '@/layouts/auth';
import FailLayout from '@/layouts/fail';

import { ConfigProvider, theme, FloatButton } from 'antd';

import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from '@/utils/tools';

function App() {
  const navigate = useNavigate();
  // 判断登陆状态
  useEffect(() => {
    const accessToken = getAccessToken();
    // 检查token是否存在
    if (accessToken) {
      // 已登录每次跳转登录清token
      if (location.pathname === '/auth') {
        removeAccessToken();
        removeRefreshToken();
      }
    } else {
      // 未登录，跳转到登录页面
      navigate('/auth', { replace: true });
    }
  }, [navigate]);
  const [value, setValue] = useState('default');
  const onChange = () => {
    setValue(value === 'default' ? 'dark' : 'default');
  };
  return (
    <ConfigProvider
      theme={{
        algorithm:
          value === 'default' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="fail/*" element={<FailLayout />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
      <FloatButton
        icon={
          <i
            style={{ fontSize: '22px', marginRight: '15px' }}
            className="iconfont mr-evening-moon1"
          ></i>
        }
        style={{ right: 24 }}
        onClick={onChange}
      />
    </ConfigProvider>
  );
}

export default App;
