import React, { useState } from 'react';
import './index.scss';
import userHead from '@/assets/headIcon/head-2.svg';

function ChatCtx() {
  const historys = [
    {
      id: 1,
      name: 'Mark',
      icon: 'head-1',
      content:
        '你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋你好👋',
      time: '2023.11.11 19:25:00',
    },
    {
      id: 2,
      name: 'Iris',
      icon: 'head-2',
      content: '你好啊',
      time: '2023.11.11 19:25:15',
    },
    {
      id: 3,
      name: '树懒',
      icon: 'head-3',
      content: '我也是',
      time: '2023.11.11 19:26:30',
    },
    {
      id: 4,
      name: '小美',
      icon: 'head-18',
      content: '同道中人',
      time: '2023.11.11 19:26:34',
    },
    {
      id: 5,
      name: '这个男人',
      icon: 'head-19',
      content: '这是我以前用的名字',
      time: '2023.11.11 19:28:00',
    },
    {
      id: 6,
      name: '树懒',
      icon: 'head-26',
      content: '哈哈哈哈哈哈',
      time: '2023.11.11 19:28:50',
    },
    {
      id: 7,
      name: '阿黄',
      icon: 'head-22',
      content: '你们在做啥',
      time: '2023.11.11 19:30:19',
    },
    {
      id: 8,
      name: 'Mark',
      icon: 'head-20',
      content: '追剧',
      time: '2023.11.11 19:33:12',
    },
    {
      id: 9,
      name: '阿黄',
      icon: 'head-14',
      content: '什么剧',
      time: '2023.11.11 19:34:40',
    },
    {
      id: 10,
      name: '小美',
      icon: 'head-19',
      content: '今天双十一',
      time: '2023.11.11 19:35:26',
    },
    {
      id: 11,
      name: '阿黄',
      icon: 'head-14',
      content: '什么剧',
      time: '2023.11.11 19:34:40',
    },
    {
      id: 12,
      name: '小美',
      icon: 'head-19',
      content: '今天双十一',
      time: '2023.11.11 19:35:26',
    },
    {
      id: 13,
      name: '阿黄',
      icon: 'head-14',
      content: '什么剧',
      time: '2023.11.11 19:34:40',
    },
    {
      id: 14,
      name: '小美',
      icon: 'head-19',
      content: '今天双十一',
      time: '2023.11.11 19:35:26',
    },
  ];
  return (
    <div className="chat-history-box">
      {historys.map((history) => {
        return (
          <div className="chat-history" key={history.id}>
            <div className="chat-history-gpt">
              <div className="chat-history-header flx-center">
                <i
                  className="iconfont mr-chatgpt"
                  style={{ fontSize: '25px' }}
                ></i>
              </div>
              <div>
                <div>
                  <span className="chat-history-time">{history.time}</span>
                </div>
                <div className="chat-history-content">{history.content}</div>
              </div>
            </div>
            <div className="chat-history-self">
              <div className="chat-history-header flx-center">
                <i
                  className="iconfont mr-chatgpt"
                  style={{ fontSize: '25px' }}
                ></i>
              </div>
              <div>
                <div>
                  <span className="chat-history-time">{history.time}</span>
                </div>
                <div className="chat-history-content">{history.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatCtx;
