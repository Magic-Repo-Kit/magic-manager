import React, { useState, useRef } from 'react';
import './index.scss';
import { Input, Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';

const { TextArea } = Input;
// 动态引入图片的函数
// async function importImage(imagePath) {
//   const image = await import(imagePath);
//   return image.default;
// }
function FooterCtx(props) {
  const inputRef = useRef(null);
  const [msg, setMsg] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(0);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded); // 更新展开状态
    setRotateDeg(isExpanded ? 0 : 180); // 更新图标旋转角度
  };
  const handleClearClick = () => {
    setMsg(''); // 清空文本框内容
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
    display: msg ? 'block' : 'none',
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

  // 发送
  const handleSubmit = throttle(() => {
    if (!msg) return;
    if (msg.trim() !== '') {
      // 触发父组件函数
      props.onMsgChange(msg);
      setMsg('');
    }
  }, 500);

  const [isCtrlPressed, setIsCtrlPressed] = useState(false); // 是否按下了 Ctrl 键
  // 按下按键
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 是否按下了 Ctrl 键
      if (isCtrlPressed) {
        setMsg(msg + '\n'); // 使用 Ctrl + Enter 触发换行
      } else {
        e.preventDefault(); // 阻止默认的 Enter 键行为
        handleSubmit();
      }
    } else if (e.key === 'Control') {
      setIsCtrlPressed(true); // 标记按下了 Ctrl 键
    }
  };
  // 松开按键
  const handleKeyUp = (e) => {
    if (e.key === 'Control') {
      setIsCtrlPressed(false); // 标记松开了 Ctrl 键
    }
  };

  return (
    <div className={`container-footer-box ${msg && 'msg'}`}>
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
        maxLength={2000}
        size="large"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        autoSize={{ minRows: isExpanded ? 10 : 1, maxRows: 10 }}
        style={{ paddingRight: '26px', fontSize: '14px' }}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <CloseOutlined style={closeStyle} onClick={handleClearClick} />
      <div className="container-footer-box-btn">
        <i className="iconfont mr-xiaolian" style={{ fontSize: '26px' }}></i>
        <div
          className={`container-footer-sumbit user-select ${
            !msg && 'disabled'
          }`}
          onClick={msg ? handleSubmit : null}
        >
          <i className="iconfont mr-fasong" style={{ fontSize: '22px' }}></i>
          <span style={{ fontSize: '14px' }}>发送</span>
        </div>
      </div>
    </div>
  );
}
export default FooterCtx;
