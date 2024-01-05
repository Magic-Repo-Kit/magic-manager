import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
import DropdownApps from './components/dropdown-apps';
import DropdownUser from './components/dropdown-user';

// antd组件
import { Dropdown } from 'antd';

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';

function Admin() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const [selectedAppName, setSelectedAppName] = useState('');

  useEffect(() => {
    const storedAppName = localStorage.getItem('selectedAppName');
    const storedApp = localStorage.getItem('selectedApp');
    setSelectedAppName(storedAppName || 'Admin'); // 如果本地存储中没有值，默认选择 'GPT'
    storedApp ? navigate(`${storedApp}`) : navigate('manage');
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
          >
            <div className="mrk-select-app user-select flx-center">
              <span>{selectedAppName}</span>
              <i className="iconfont mr-double-arrow-down"></i>
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
            <Dropdown
              dropdownRender={() => (
                <DropdownUser
                  selectedAppName={selectedAppName}
                  setSelectedAppName={setSelectedAppName}
                />
              )}
              trigger={['click']}
              placement="bottom"
            >
              <div className="admin-switch admin-user-container">
                <i className="iconfont mr-user--line"></i>
              </div>
            </Dropdown>

            {/* <div>
              <i
                onClick={() => {
                  window.location.href = '/auth';
                }}
                className="iconfont mr-tuichu"
                style={{
                  color: '#d81e06',
                  marginRight: '8px',
                  fontSize: '18px',
                  marginLeft: '10px',
                }}
              ></i>
            </div> */}
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
