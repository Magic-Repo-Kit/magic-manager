import React, { useState, useRef } from 'react';
import './index.scss';
import { Input, Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;
// 动态引入图片的函数
// async function importImage(imagePath) {
//   const image = await import(imagePath);
//   return image.default;
// }
function FooterCtx() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(0);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded); // 更新展开状态
    setRotateDeg(isExpanded ? 0 : 180); // 更新图标旋转角度
  };
  const handleClearClick = () => {
    setValue(''); // 清空文本框内容
    inputRef.current.focus();
  };
  const closeStyle = {
    color: '#292c2f',
    position: 'absolute',
    right: '132px',
    bottom: '10px',
    fontSize: '18px',
    zIndex: '1',
    cursor: 'pointer',
    display: value ? 'block' : 'none',
  };
  // const imageNames = [
  //   'emoji-1.svg',
  //   'emoji-2.svg',
  //   'emoji-3.svg',
  //   'emoji-4.svg',
  //   'emoji-5.svg',
  // ];
  // const images = imageNames.map((imageName, index) => {
  //   const imagePath = `./emoji/${imageName}`;
  //   return (
  //     <img
  //       key={index}
  //       src={importImage(imagePath)}
  //       alt={`Emoji ${index + 1}`}
  //       style={{ width: '22px' }}
  //     />
  //   );
  // });
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
        maxLength={50000}
        size="large"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoSize={{ minRows: isExpanded ? 10 : 1, maxRows: 10 }}
        style={{ paddingRight: '26px' }}
        ref={inputRef}
      />
      <CloseOutlined style={closeStyle} onClick={handleClearClick} />
      <div className="container-footer-box-btn">
        <i className="iconfont mr-xiaolian" style={{ fontSize: '26px' }}></i>
        {/* <div>{images}</div> */}
        <div className="container-footer-sumbit user-select">
          <i className="iconfont mr-fasong" style={{ fontSize: '22px' }}></i>
          <span style={{ fontSize: '14px' }}>发送</span>
        </div>
      </div>
    </div>
  );
}
export default FooterCtx;
