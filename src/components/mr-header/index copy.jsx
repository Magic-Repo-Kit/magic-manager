import './index.scss';
import { MinusOutlined } from '@ant-design/icons';
import { Input, Popover, Badge } from 'antd';

const { Search } = Input;

const MrHeader = () => {
  return (
    <div className="flx-justify-between cursor-point">
      <div className="flx-justify-between" style={{ paddingLeft: '20px' }}>
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
        <Search placeholder="搜索" style={{ width: '250px' }} />
        <i
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#ffce45',
          }}
          className="color-text-body iconfont mr-evening-moon1"
        ></i>
        {/* 全屏/非全屏 */}
        <i
          style={{ fontSize: '22px' }}
          className="color-text-body iconfont mr-un-full"
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
          title="标题"
          content="内容"
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
    </div>
  );
};

export default MrHeader;
