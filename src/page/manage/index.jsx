import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { Outlet, useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';

// antd组件
import { Tooltip } from 'antd';

function Manage() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由

  const [manageMenuUrl, setManageMenuUrl] = useState('');
  const [manageMenuName, setManageMenuName] = useState('工作台');

  const handleAppClick = (url, name) => {
    setManageMenuUrl(url);
    navigate(`${url}`);
    localStorage.setItem('manageMenuUrl', url);
    setManageMenuName(name);
  };
  useEffect(() => {
    const storedManageMenuUrl = localStorage.getItem('manageMenuUrl');
    setManageMenuUrl(storedManageMenuUrl || 'work-platform');
  }, []);
  return (
    <div className={`manage-container ${darkMode ? 'dark-mode' : ''}`}>
      <aside>
        <nav>
          {/* 工作台 */}
          <Tooltip
            title="工作台"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-first ${
                manageMenuUrl === 'work-platform' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('work-platform', '工作台')}
            >
              <img src={mrkLogo} alt="" className="mrkLogo" />
            </div>
          </Tooltip>

          {/* 知识库 */}
          <Tooltip
            title="知识库"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'knowledge' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('knowledge', '知识库')}
            >
              <i className="iconfont mr-inbox"></i>
            </div>
          </Tooltip>
          {/* 账号管理 */}
          <Tooltip
            title="账号管理"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'user-manage' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('user-manage', '账号管理')}
            >
              <i className="iconfont mr-user-admin"></i>
            </div>
          </Tooltip>

          {/* 权限管理 */}
          <Tooltip
            title="权限管理"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'roles-manage' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('roles-manage', '权限管理')}
            >
              <i className="iconfont mr-fingerprint"></i>
            </div>
          </Tooltip>
          {/* 联系我们 */}
          <Tooltip
            title="联系我们"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'contact-us' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('contact-us', '联系我们')}
            >
              <i className="iconfont mr-lightning"></i>
            </div>
          </Tooltip>
          <div className="aside-last">
            <div className="space-line"></div>
            {/* 工作台设置 */}
            <Tooltip
              title="设置"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="right"
            >
              <div
                className={`aside-item-active ${
                  manageMenuUrl === 'setting-manage' ? 'active' : ''
                }`}
                onClick={() => handleAppClick('setting-manage', '设置')}
              >
                <i className="iconfont mr-setting-3"></i>
              </div>
            </Tooltip>
            <Tooltip
              title="隐藏"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="right"
            >
              {/* 折叠 */}
              <div>
                <i className="iconfont mr-yincangmulu"></i>
              </div>
            </Tooltip>
          </div>
        </nav>
      </aside>
      <main>
        <header>
          <div className="manage-header-item-box font-family-dingding">
            <div className="manage-header-greeting-box flx-align-center ">
              <div className="manage-header-item flx-center">
                <i className="iconfont mr-bookmark-full"></i>
                <span>{manageMenuName}</span>
              </div>
              <div className="manage-header-greeting">下午好！</div>
            </div>

            <div className="space-line"></div>
            <div className="manage-header-title single-omit">
              百宝袋开始内测了啦！当前时间2024-01-12
            </div>
          </div>
        </header>
        {/* 渲染子路由 */}
        <Outlet />
      </main>
    </div>
  );
}
export default Manage;
