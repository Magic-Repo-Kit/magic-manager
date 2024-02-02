import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';

// antd组件
import { Tooltip } from 'antd';

function Manage() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); //路由
  const location = useLocation();

  const [manageMenuUrl, setManageMenuUrl] = useState('');
  const [manageMenuName, setManageMenuName] = useState('发现');

  const [isHidden, setIsHidden] = useState(false);

  const handleAppClick = (url, name) => {
    // 不能从当前页 进 当前页
    if (location.pathname.includes(url)) {
      return;
    }
    setManageMenuUrl(url);
    navigate(url);
    sessionStorage.setItem('manageMenuUrl', url);
    sessionStorage.setItem('manageMenuName', name);
    setManageMenuName(name);
  };
  useEffect(() => {
    const storedManageMenuUrl = sessionStorage.getItem('manageMenuUrl');
    setManageMenuUrl(storedManageMenuUrl || 'work-platform');
    const storedManageMenuName = sessionStorage.getItem('manageMenuName');
    setManageMenuName(storedManageMenuName || '发现');
  }, []);
  return (
    <div className={`manage-container ${darkMode ? 'dark-mode' : ''}`}>
      <aside>
        {/* 控制显示隐藏 */}
        <div
          className={`manage-display-aside ${isHidden ? '' : 'hidden'}`}
          onClick={() => setIsHidden(false)}
        >
          <i className="iconfont mr-yincangmulu"></i>
        </div>

        <nav className={isHidden ? 'hidden' : ''}>
          {/* 发现 */}
          <Tooltip
            title="发现"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-first ${
                manageMenuUrl === 'work-platform' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('work-platform', '发现')}
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
          {/* 创建角色预览 */}
          <Tooltip
            title="创建角色"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'create-preview' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('create-preview', '创建角色')}
            >
              <i
                className="iconfont mr-a-xingzhuang1858kaobei"
                style={{ fontSize: 20 }}
              ></i>
            </div>
          </Tooltip>
          {/* 闪聊 */}
          <Tooltip
            title="闪聊"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'chat' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('chat', '闪聊')}
            >
              <i className="iconfont mr-ziyuan49" style={{ fontSize: 20 }}></i>
            </div>
          </Tooltip>

          {/* 我 */}
          <Tooltip
            title="我"
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'user-center' ? 'active' : ''
              }`}
              onClick={() => handleAppClick('user-center', '我')}
            >
              <i className="iconfont mr-user-admin"></i>
            </div>
          </Tooltip>
          <div className="aside-last">
            <div className="space-line"></div>

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
            <Tooltip
              title="隐藏"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="right"
            >
              {/* 折叠 */}
              <div onClick={() => setIsHidden(true)}>
                <i className="iconfont mr-zhankaimulu"></i>
              </div>
            </Tooltip>
          </div>
        </nav>
      </aside>
      <main className={isHidden ? 'no-padding-left' : ''}>
        {/* <header>
          <div className="manage-header-item-box font-family-dingding">
            <div className="manage-header-item flx-center">
              <i className="iconfont mr-bookmark-full"></i>
              <span>{manageMenuName}</span>
            </div>
          </div>
        </header> */}
        {/* 渲染子路由 */}
        <Outlet />
      </main>
    </div>
  );
}
export default Manage;
