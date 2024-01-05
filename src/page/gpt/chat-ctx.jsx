import React, { useRef, useState, useEffect, useContext } from 'react';
import formatDate from '@/utils/formatDate';
import './index.scss';

function ChatCtx(props) {
  console.log(props.messages);
  const scrollChat = useRef(null);
  useEffect(() => {
    // 在组件加载完成后滚动到底部
    scrollChat.current.scrollTop = scrollChat.current.scrollHeight;
  }, [props.messages]);
  return (
    <div className="chat-history-box" ref={scrollChat}>
      {/* 默认欢迎语 */}
      <div className="chat-history">
        <div className="chat-history-header flx-center">
          <i className="iconfont mr-chatgpt" style={{ fontSize: '25px' }}></i>
        </div>
        <div>
          <div>
            <span className="chat-history-time">{formatDate(new Date())}</span>
          </div>
          <div className="chat-history-content">
            Hi, welcome to Mrk-Bot! Go ahead and send me a message. 😄
          </div>
        </div>
      </div>

      {props.messages.map((msg, index) => {
        return (
          <div className={`chat-history ${msg.type}`} key={msg.id}>
            <div className="chat-history-header flx-center">
              <i
                className="iconfont mr-chatgpt"
                style={{ fontSize: '25px' }}
              ></i>
            </div>
            <div>
              <div>
                <span className="chat-history-time">{msg.timestamp}</span>
              </div>

              <div className="chat-history-content">
                {props.isLoading &&
                msg.type === 'reply' &&
                index === props.messages.length - 1 ? (
                  <div className="loading-jumps">
                    <span className="jump"></span>
                    <span className="jump"></span>
                    <span className="jump"></span>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatCtx;
