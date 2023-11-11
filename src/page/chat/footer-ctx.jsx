import React, { useState } from 'react';
import './index.scss';
import { Input } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function footerCtx() {
  const [value, setValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(0);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded); // 更新展开状态
    setRotateDeg(isExpanded ? 0 : 180); // 更新图标旋转角度
  };
  return (
    <div className="container-footer-box">
      <div className="container-footer-box-btn" onClick={handleExpandClick}>
        <i
          className="iconfont mr-zhankai1"
          style={{
            fontSize: '22px',
            transform: `rotate(${rotateDeg}deg)`,
            transition: 'transform 0.3s ease',
          }}
        ></i>
      </div>
      <TextArea
        allowClear
        style={{ transition: 'all 0.3s ease-out' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoSize={{ minRows: isExpanded ? 8 : 2, maxRows: 10 }}
      />
      <div className="container-footer-box-btn">
        <i className="iconfont mr-xiaolian" style={{ fontSize: '22px' }}></i>

        <div className="container-footer-sumbit user-select">
          <i className="iconfont mr-fasong" style={{ fontSize: '22px' }}></i>
          <span style={{ fontSize: '14px' }}>发送</span>
        </div>
      </div>
    </div>
  );
}
export default footerCtx;
