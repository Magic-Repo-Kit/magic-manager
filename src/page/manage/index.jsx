import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import { IntlContext } from '@/components/IntlProvider'; // 国际化

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';

// antd组件
import { Tooltip } from 'antd';

function Manage() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const { currentIntl } = useContext(IntlContext);

  const navigate = useNavigate(); //路由
  const location = useLocation();

  const [manageMenuUrl, setManageMenuUrl] = useState('');
  // const [manageMenuName, setManageMenuName] = useState('发现');

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
    // setManageMenuName(name);
  };
  useEffect(() => {
    const storedManageMenuUrl = sessionStorage.getItem('manageMenuUrl');
    setManageMenuUrl(storedManageMenuUrl || 'discover');
    // const storedManageMenuName = sessionStorage.getItem('manageMenuName');
    // setManageMenuName(
    //   storedManageMenuName || currentIntl.formatMessage({ id: 'menu.discover' })
    // );
  }, []);
  return (
    <div className={`manage-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* PC  */}
      <aside>
        {/* 控件显示隐藏 */}
        <div
          className={`manage-display-aside ${isHidden ? '' : 'hidden'}`}
          onClick={() => setIsHidden(false)}
        >
          <i className="iconfont mr-yincangmulu"></i>
        </div>

        <nav className={isHidden ? 'hidden' : ''}>
          {/* 发现 */}
          <Tooltip
            title={currentIntl.formatMessage({ id: 'menu.discover' })}
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-first ${
                manageMenuUrl === 'discover' ? 'active' : ''
              }`}
              onClick={() =>
                handleAppClick(
                  'discover',
                  currentIntl.formatMessage({ id: 'menu.discover' })
                )
              }
            >
              <img src={mrkLogo} alt="" className="mrkLogo" />
            </div>
          </Tooltip>

          {/* 知识库 */}
          <Tooltip
            title={currentIntl.formatMessage({ id: 'menu.knowledge' })}
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'knowledge' ? 'active' : ''
              }`}
              onClick={() =>
                handleAppClick(
                  'knowledge',
                  currentIntl.formatMessage({ id: 'menu.knowledge' })
                )
              }
            >
              <i className="iconfont mr-inbox" style={{ fontSize: 22 }}></i>
            </div>
          </Tooltip>
          {/* 创建角色预览 */}
          <Tooltip
            title={currentIntl.formatMessage({ id: 'menu.create' })}
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'create-preview' ? 'active' : ''
              }`}
              onClick={() =>
                handleAppClick(
                  'create-preview',
                  currentIntl.formatMessage({ id: 'menu.create' })
                )
              }
            >
              <i
                className="iconfont mr-a-xingzhuang1858kaobei"
                style={{ fontSize: 20 }}
              ></i>
            </div>
          </Tooltip>
          {/* 消息 */}
          <Tooltip
            title={currentIntl.formatMessage({ id: 'menu.chat' })}
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'chat' ? 'active' : ''
              }`}
              onClick={() =>
                handleAppClick(
                  'chat',
                  currentIntl.formatMessage({ id: 'menu.chat' })
                )
              }
            >
              <i className="iconfont mr-ziyuan49" style={{ fontSize: 22 }}></i>
            </div>
          </Tooltip>

          {/* 我 */}
          <Tooltip
            title={currentIntl.formatMessage({ id: 'menu.me' })}
            arrow={false}
            color={'rgba(25, 25, 25, 0.8)'}
            placement="right"
          >
            <div
              className={`aside-item-active ${
                manageMenuUrl === 'user-center' ? 'active' : ''
              }`}
              onClick={() =>
                handleAppClick(
                  'user-center',
                  currentIntl.formatMessage({ id: 'menu.me' })
                )
              }
            >
              <i className="iconfont mr-user-admin"></i>
            </div>
          </Tooltip>

          <div className="aside-last">
            <div className="space-line"></div>

            {/* 权限管理 */}
            <Tooltip
              title={currentIntl.formatMessage({ id: 'menu.manage' })}
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="right"
            >
              <div
                className={`aside-item-active ${
                  manageMenuUrl === 'roles-manage' ? 'active' : ''
                }`}
                onClick={() =>
                  handleAppClick(
                    'roles-manage',
                    currentIntl.formatMessage({ id: 'menu.manage' })
                  )
                }
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
      {/* 移动-菜单 */}
      <div className="manage-mobile-menus">
        {/* 知识库 */}
        <div
          className={`manage-mobile-menu-item ${
            manageMenuUrl === 'knowledge' ? 'active' : ''
          }`}
          onClick={() =>
            handleAppClick(
              'knowledge',
              currentIntl.formatMessage({ id: 'menu.knowledge' })
            )
          }
        >
          <i className="iconfont mr-inbox" style={{ fontSize: 20 }}></i>
          <span>{currentIntl.formatMessage({ id: 'menu.knowledge' })}</span>
        </div>
        {/* 创建角色预览 */}
        <div
          className={`manage-mobile-menu-item ${
            manageMenuUrl === 'create-preview' ? 'active' : ''
          }`}
          onClick={() =>
            handleAppClick(
              'create-preview',
              currentIntl.formatMessage({ id: 'menu.create' })
            )
          }
        >
          <i
            className="iconfont mr-a-xingzhuang1858kaobei"
            style={{ fontSize: 20 }}
          ></i>
          <span>{currentIntl.formatMessage({ id: 'menu.create' })}</span>
        </div>
        {/* 发现 */}
        <div
          className={`manage-mobile-menu-item ${
            manageMenuUrl === 'discover' ? 'active' : ''
          }`}
          onClick={() =>
            handleAppClick(
              'discover',
              currentIntl.formatMessage({ id: 'menu.discover' })
            )
          }
        >
          <i className="iconfont mr-zhishixingqiu"></i>
          <span>{currentIntl.formatMessage({ id: 'menu.discover' })}</span>
        </div>

        {/* 消息 */}
        <div
          className={`manage-mobile-menu-item ${
            manageMenuUrl === 'chat' ? 'active' : ''
          }`}
          onClick={() =>
            handleAppClick(
              'chat',
              currentIntl.formatMessage({ id: 'menu.chat' })
            )
          }
        >
          <i className="iconfont mr-ziyuan49"></i>
          <span>{currentIntl.formatMessage({ id: 'menu.chat' })}</span>
        </div>

        {/* 我 */}

        <div
          className={`manage-mobile-menu-item ${
            manageMenuUrl === 'user-center' ? 'active' : ''
          }`}
          onClick={() =>
            handleAppClick(
              'user-center',
              currentIntl.formatMessage({ id: 'menu.me' })
            )
          }
        >
          <i className="iconfont mr-user-admin" style={{ fontSize: 24 }}></i>
          <span>{currentIntl.formatMessage({ id: 'menu.me' })}</span>
        </div>
      </div>
      {/* 子路由 */}
      <main className={isHidden ? 'no-padding-left' : ''}>
        <Outlet />
      </main>
    </div>
  );
}
export default Manage;
