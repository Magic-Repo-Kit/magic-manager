import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
// import DropdownApps from './components/dropdown-apps';
// import DropdownUser from './components/dropdown-user';

// antd组件
import { Dropdown, Drawer } from 'antd';

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
import userHead from '@/assets/images/user-head.png';

const MrHeader = () => {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const [userOpen, setUserOpen] = useState(false); //user抽屉

  return (
    <header className="mr-header-container">
      <div className="header-content">
        <div className="mrk-logo">
          <img src={mrkLogo} alt="" className="mrkLogo" />
          <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
        </div>
        <div className="btn-box">
          <DarkModeToggle size="20px" />
          <div className="space-line"></div>
          <div className="admin-switch flx-center">
            <i className="iconfont mr-qiehuanyuyan"></i>
          </div>
          {/* user */}
          <div
            className="admin-switch admin-user-container"
            // onClick={() => setUserOpen(true)}
          >
            {/* <i className="iconfont mr-user--line"></i> */}
            <img src={userHead} alt="" />
          </div>
          <Drawer
            closeIcon={null}
            placement="right"
            maskClosable={false}
            open={userOpen}
            className="user-custom-drawer"
          >
            {/* <DropdownUser setUserOpen={setUserOpen} /> */}
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default MrHeader;
