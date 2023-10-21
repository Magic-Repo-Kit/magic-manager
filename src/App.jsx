import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from '@/layouts/admin';
import AuthLayout from '@/layouts/auth';
import FailLayout from '@/layouts/fail';

function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="fail/*" element={<FailLayout />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
