import './index.scss';
import { Flex, Typography, Popover } from 'antd';
const { Title } = Typography;

const MrHeader = ({ slotTitle, slotIcon }) => {
  return (
    <Flex justify="space-between" align="center">
      <Title level={4} style={{ margin: 0 }} className="font-family-dingding">
        {slotTitle}
      </Title>
      {/* 右侧 */}
      <div justify="space-between" align="center" style={{ height: '60px' }}>
        {slotIcon.map((item) => (
          <i
            style={{ fontSize: '22px', marginLeft: '15px' }}
            className={`iconfont mr-${item.icon}`}
          ></i>
        ))}
      </div>
    </Flex>
  );
};

export default MrHeader;
