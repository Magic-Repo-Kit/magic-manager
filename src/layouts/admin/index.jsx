import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
import DropdownApps from './components/dropdown-apps';
import DropdownUser from './components/dropdown-user';

// antd组件
import { Dropdown, Drawer } from 'antd';

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
import userHead from '@/assets/images/user-head.png';

function Admin() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const [selectedAppName, setSelectedAppName] = useState('');
  const [userOpen, setUserOpen] = useState(false); //user抽屉
  const [dropdownOpen, setDropdownOpen] = useState(false); //下拉

  useEffect(() => {
    const storedAppName = sessionStorage.getItem('selectedAppName');
    setSelectedAppName(storedAppName || '工作台'); // 如果本地存储中没有值，默认选择 '工作台'
    // 此处放开有bug，路由跳转冲突
    // const storedApp = sessionStorage.getItem('selectedApp');
    // storedApp ? navigate(`${storedApp}`) : navigate('manage');
    setDropdownOpen(false); // 关闭下拉菜单
  }, [navigate]);

  return (
    <div className={`admin-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-content">
          <div className="mrk-logo">
            <img src={mrkLogo} alt="" className="mrkLogo" />
            <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
          </div>
          {/* apps */}
          <Dropdown
            dropdownRender={() => (
              <DropdownApps
                selectedAppName={selectedAppName}
                setSelectedAppName={setSelectedAppName}
              />
            )}
            placement="bottom"
            trigger={['click']}
            open={dropdownOpen}
            onOpenChange={(dropdownOpen) => setDropdownOpen(dropdownOpen)}
          >
            <div className="mrk-select-app user-select flx-center font-family-dingding">
              <span>{selectedAppName}</span>
              <i className="iconfont mr-menu-4"></i>
            </div>
          </Dropdown>

          {/* 右侧 */}
          <div className="btn-box">
            <DarkModeToggle size="20px" />
            <div className="space-line"></div>
            <div className="admin-switch flx-center">
              <i className="iconfont mr-qiehuanyuyan"></i>
            </div>
            {/* user */}
            <div
              className="admin-switch admin-user-container"
              onClick={() => setUserOpen(true)}
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
              <DropdownUser setUserOpen={setUserOpen} />
            </Drawer>
          </div>
        </div>
      </header>
      <main>
        {/* 渲染子路由 */}
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
