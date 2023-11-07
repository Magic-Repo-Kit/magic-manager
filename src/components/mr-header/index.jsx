import './index.scss';
import { Flex, Typography, Popover, Avatar } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import mrkLogoLight from '@/assets/images/mrk6.png';
import mrkLogoDark from '@/assets/images/mrk5.png';
import mrkLogo from '@/assets/images/mrk7.png';

const { Title } = Typography;

const MrHeader = (props) => {
  return (
    <Flex justify="space-between" align="center">
      {/* <Title
        level={4}
        style={{ margin: 0 }}
        className="font-family-dingding gradient-text"
      >
        {props.slotTitle}
      </Title> */}
      <img src={mrkLogo} alt="" height="25" />

      {/* 右侧 */}
      <Flex justify="space-between" align="center">
        <div style={{ height: '60px' }}>
          {props.slotIcon.map((item) => (
            <i
              key={item.id}
              style={{ fontSize: '22px', marginRight: '15px' }}
              className={`iconfont mr-${item.icon}`}
            ></i>
          ))}
        </div>

        <Popover
          placement="bottomRight"
          title={
            <div
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e9ecef',
                fontWeight: '700',
                color: '#1b254b',
              }}
            >
              👋 你好！
            </div>
          }
          content={
            <div
              style={{ padding: '1rem', color: '#1b254b', cursor: 'pointer' }}
            >
              <div style={{ height: '30px' }}>个人中心</div>
              <div style={{ height: '30px' }}>设置</div>
              <div
                style={{ height: '30px', color: '#f93336' }}
                onClick={() => {
                  window.location.replace('/auth');
                }}
              >
                <LoginOutlined />
                退出
              </div>
            </div>
          }
          trigger="click"
        >
          <Avatar icon={<UserOutlined style={{ fontSize: '16px' }} />} />
        </Popover>
      </Flex>
    </Flex>
  );
};

export default MrHeader;
