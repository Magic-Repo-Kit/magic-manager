import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/login';
import AppProvider from './components/AppProvider';

import './styles/reset.less';
import '@/styles/common.less';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
      <ConfigProvider locale={zhCN}>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path='/' element={<Login />} />
          <Route path='/admin/*' element={<App />} /> */}
        </Routes>
      </ConfigProvider>
    </Router>
  </AppProvider>
);
