import ReactDOM from 'react-dom/client';
import '@/styles/reset.less';
import '@/styles/common.less';
import '@/index.less';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './views/login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>
);
