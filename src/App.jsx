import { Routes, Route } from 'react-router-dom';
import MyLayout from '@/components/MyLayout';

import Home from '@/views/home';
import TreeFiter from '@/views/superTable/treeFiter';
import SelectFiter from '@/views/superTable/selectFiter';
import ChartBoard from '@/views/databoard/chartBoard';
import ImgBoard from '@/views/databoard/imgBoard';
import Users from '@/views/users';
import About from '@/views/about';

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="superTable/treeFiter" element={<TreeFiter />} />
        <Route path="superTable/selectFiter" element={<SelectFiter />} />
        <Route path="databoard/chartBoard" element={<ChartBoard />} />
        <Route path="databoard/imgBoard" element={<ImgBoard />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
      </Routes>
    </MyLayout>
  );
}

export default App;
