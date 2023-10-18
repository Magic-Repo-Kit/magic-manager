import { useState } from 'react';
import './index.less';
import { useNavigate } from 'react-router-dom';

import viteLogo from '../../../public/vite.svg';
import reactLogo from '@/assets/react.svg';
import {
  UserOutlined,
  ExpandOutlined,
  CompressOutlined,
  SettingOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  ShareAltOutlined,
  RocketFilled,
  MinusOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Input, Popover, Badge } from 'antd';

import Home from '@/views/home';
import TreeFiter from '@/views/superTable/treeFiter';
import SelectFiter from '@/views/superTable/selectFiter';
import ChartBoard from '@/views/databoard/chartBoard';
import ImgBoard from '@/views/databoard/imgBoard';
import Users from '@/views/users';
import About from '@/views/about';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const MyLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // 夜间模式
  const [nigntmode, setNigntmode] = useState(false);
  const classNigntmode = `color-text-body iconfont ${
    nigntmode ? 'mr-evening-moon1' : 'mr-day-moon'
  }`;
  // 全屏;
  const [fullmode, setFullmode] = useState(false);
  const classFullmode = `color-text-body iconfont ${
    fullmode ? 'mr-un-full' : 'mr-full'
  }`;

  const classNamesLogo = `logo ${collapsed ? 'logo-rotate' : ''}`;
  const menus = [
    {
      key: '/admin/home',
      icon: <HomeOutlined style={{ fontSize: '20px' }} />,
      element: <Home />,
      label: '首页',
    },
    {
      key: '/admin/superTable',
      icon: <RocketFilled style={{ fontSize: '20px' }} />,
      label: '超级表格',
      roles: ['admin', 'editor'],
      children: [
        {
          label: 'treeFiter',
          key: '/admin/superTable/treeFiter',
          element: <TreeFiter />,
          roles: ['admin'],
        },
        {
          label: 'selectFiter',
          key: '/admin/superTable/selectFiter',
          element: <SelectFiter />,
          roles: ['admin', 'editor'],
        },
      ],
    },
    {
      key: '/admin/databoard',
      icon: <DeploymentUnitOutlined style={{ fontSize: '20px' }} />,
      label: '数据板',
      roles: ['admin', 'editor'],
      children: [
        {
          label: 'databoard',
          key: '/admin/databoard/chartBoard',
          element: <ChartBoard />,
          roles: ['admin'],
        },
        {
          label: 'imgBoard',
          key: '/admin/databoard/imgBoard',
          element: <ImgBoard />,
          roles: ['admin', 'editor'],
        },
      ],
    },
    {
      key: '/admin/users',
      icon: <UserOutlined style={{ fontSize: '20px' }} />,
      label: '用户管理',
      element: <Users />,
      roles: ['admin', 'kf'],
    },
    {
      key: '/admin/about',
      icon: <ShareAltOutlined style={{ fontSize: '20px' }} />,
      label: '关于',
      element: <About />,
      roles: ['admin', 'kf'],
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const popoverTitle = <div className="popover-title">👋Hey,friend</div>;
  const popoverContent = (
    <div className="popover-content">
      <div>个人信息</div>
      <div>修改密码</div>
      <div
        onClick={() => {
          navigate('/');
        }}
      >
        退出登录
      </div>
    </div>
  );
  const searchIcon = (
    <i style={{ fontSize: '16px' }} className="iconfont mr-search-1"></i>
  );
  return (
    <Layout className="container">
      <Header
        className="flx-justify-between cursor-point"
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div className="flx-justify-between" style={{ paddingLeft: '20px' }}>
          {/* 展开/隐藏 */}
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              background: colorBgContainer,
            }}
          /> */}
          <i
            className="iconfont mr-circular"
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#0162ff',
            }}
          ></i>
          <i
            className="iconfont mr-triangle"
            style={{ fontSize: '30px', color: '#0162ff' }}
          ></i>
          <i
            className="iconfont mr-square"
            style={{ fontSize: '30px', color: '#0162ff' }}
          ></i>
          <span
            className="header-left-title font-family-dingding"
            style={{
              marginLeft: '15px',
              fontSize: '22px',
            }}
          >
            Magicrepokit 百宝袋
          </span>
        </div>

        <div className="header-right flx-center">
          <Search
            placeholder="搜索"
            onSearch={onSearch}
            enterButton={searchIcon}
            style={{ width: '250px' }}
          />
          <i
            style={{
              fontSize: '22px',
              fontWeight: nigntmode ? '' : 600,
              color: nigntmode ? '#ffce45' : '',
            }}
            className={classNigntmode}
            onClick={() => setNigntmode(!nigntmode)}
          ></i>
          {/* 全屏/非全屏 */}
          <i
            style={{ fontSize: '22px' }}
            className={classFullmode}
            onClick={() => setFullmode(!fullmode)}
          ></i>
          <Badge count={5} size="small">
            <i
              style={{ fontSize: '22px' }}
              className="color-text-body iconfont mr-notify"
            ></i>
          </Badge>
          <MinusOutlined
            style={{
              transform: 'rotate(90deg)',
              fontSize: '22px',
              margin: '0px',
            }}
          />
          <Popover
            placement="bottomRight"
            trigger="click"
            title={popoverTitle}
            content={popoverContent}
          >
            <div className="flx-center cursor-point">
              <div className="header-right-user flx-center">
                <i
                  style={{ fontSize: '25px' }}
                  className="color-text-body iconfont mr-user"
                ></i>
              </div>
              <div style={{ fontWeight: 600 }}>你好，谭智亮</div>
            </div>
          </Popover>
        </div>
      </Header>

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="container-title flx-center">
            <img
              src={collapsed ? reactLogo : viteLogo}
              className={classNamesLogo}
              alt="Vite logo"
            />
            <span
              style={{
                display: collapsed ? 'none' : 'block',
                fontSize: '20px',
              }}
            >
              MagicRepokit
            </span>
          </div>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            items={menus}
            style={{ fontSize: '15px', fontWeight: 600 }}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'auto',
              flex: 1,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
