import React from 'react';
import './index.scss';
import { Flex, Typography, Popconfirm } from 'antd';
// import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// import mrkLogoLight from '@/assets/images/mrk-light.png';
// import mrkLogoDark from '@/assets/images/mrk-dark.png';
import mrkLogo from '@/assets/images/logo-mrk.png';

const { Title } = Typography;

const MrHeader = (props) => {
  const navigate = useNavigate();
  const { slotTitle, slotIcon, onIconClick, mode } = props;
  const handleIconClick = (id) => {
    const icon = slotIcon.find((icon) => icon.id === id);
    if (icon && onIconClick) {
      onIconClick(icon);
    }
  };

  return (
    <Flex justify="space-between" align="center" className="header-container">
      <div
        onClick={() => navigate('/admin')}
        className="cursor-point flx-center "
        style={{ height: '60px' }}
      >
        <img src={mrkLogo} height="30" style={{ marginRight: '5px' }} />
        {/* <img
          src={mode === 'default' ? mrkLogoLight : mrkLogoDark}
          alt="MRK"
          height="25"
        /> */}
      </div>

      {/* 右侧 */}
      <Flex justify="space-between" align="center">
        <div style={{ height: '60px' }}>
          {slotIcon.map((item) => (
            <i
              key={item.id}
              style={{
                fontSize: '22px',
                marginRight: '15px',
                cursor: 'pointer',
              }}
              className={`iconfont mr-${item.icon} header-icon`}
              onClick={() => handleIconClick(item.id)}
            ></i>
          ))}
        </div>
        <Popconfirm
          title="提示"
          description="确认退出当前账号？"
          okText="确认"
          okType="primary"
          cancelText="取消"
          onConfirm={() => window.location.replace('/auth')}
          icon={
            <i
              className="iconfont mr-tuichu"
              style={{ color: '#d81e06', marginRight: '8px', fontSize: '14px' }}
            ></i>
          }
        >
          <i
            style={{
              fontSize: '22px',
              marginRight: '15px',
              cursor: 'pointer',
              height: '60px',
            }}
            className="iconfont mr-leave-1 header-login-icon"
          ></i>
        </Popconfirm>
      </Flex>
    </Flex>
  );
};

export default MrHeader;
