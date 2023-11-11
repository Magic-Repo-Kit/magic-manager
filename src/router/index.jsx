import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 路由菜单
import Home from '@/page/home';
import Chat from '@/page/chat';
import TreeFiter from '@/page/superTable/children/treeFiter';
import SelectFiter from '@/page/superTable/children/selectFiter';
import ChartBoard from '@/page/databoard/chartBoard';
import ImgBoard from '@/page/databoard/imgBoard';
import Users from '@/page/users';
import About from '@/page/about';

function Router() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="chat" element={<Chat />} />
      <Route path="tree-fiter" element={<TreeFiter />} />
      <Route path="select-fiter" element={<SelectFiter />} />
      <Route path="chart-board" element={<ChartBoard />} />
      <Route path="img-board" element={<ImgBoard />} />
      <Route path="users" element={<Users />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}

export default Router;
