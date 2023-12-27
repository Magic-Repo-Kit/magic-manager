import React, { useState, useEffect } from 'react';
import './index.scss';
import { useSpring, animated } from 'react-spring';
import { fallLRIn } from '@/utils/animations';
import formatDate from '@/utils/formatDate';
import { random } from '@/utils/tools';
import { Layout } from 'antd';
import { RollbackOutlined, AlignRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import ChatCtx from './chat-ctx';
import FooterCtx from './footer-ctx';

// import sseRequest from '@/request/sseRequest';
// import { getNewToken } from '@/request/auth';
// import { getAccessToken, getRefreshToken } from '@/utils/tools';

const { Sider, Content } = Layout;

function Chat() {
  const navigate = useNavigate();

  const contentStyle = {
    color: '#fff',
    backgroundColor: '#2f3236',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };
  const siderStyle = {
    color: '#fff',
    backgroundColor: '#292b2f',
    height: '100vh',
    width: '200px',
  };
  const groups = [
    {
      id: 1,
      name: 'Group 1',
    },
    {
      id: 2,
      name: 'Group 2',
    },
    {
      id: 3,
      name: 'Group 3',
    },
    {
      id: 4,
      name: 'Chatgpt 3',
    },
    {
      id: 5,
      name: 'Chatgpt 4',
    },
  ];
  const [activeGroup, setActiveGroup] = useState(
    sessionStorage.getItem('activeGroup') || groups[0]
  );
  const fallIn = useSpring(fallLRIn);

  // 在组件挂载时，从 sessionStorage 中恢复 activeGroup 的值
  useEffect(() => {
    const savedActiveGroup = sessionStorage.getItem('activeGroup');
    if (savedActiveGroup) {
      const parsedActiveGroup = JSON.parse(savedActiveGroup);
      setActiveGroup(parsedActiveGroup);
    }
  }, []);
  // 在 activeGroup 改变时，保存 activeGroup 到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem('activeGroup', JSON.stringify(activeGroup));
  }, [activeGroup]);

  const [siderWidth, setSiderWidth] = useState(250);
  const handleSiderWidth = () => {
    if (siderWidth === 250) {
      setSiderWidth(0);
    } else {
      setSiderWidth(250);
    }
  };

  const [messages, setMessages] = useState([]); //消息

  const BOT_MSGS = [
    "Hi there, I'm Fabio and you?",
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    "That's awesome",
    'Codepen is a nice place to stay',
    "I think you're a nice person",
    'Why do you think that?',
    'Can you explain?',
    "Anyway I've gotta go now",
    'It was a pleasure chat with you',
    'Time to make a new codepen',
    'Bye',
    ':)',
  ];
  const [isLoading, setisLoading] = useState(false);

  // SSE 连接
  const [sseData, setSSEData] = useState('');

  // 发起gpt请求
  const getGptMsg = async (msg) => {
    // 先插入一条空白消息，loading等待中
    const id = 'reply' + Date.now();
    insertMessage('reply', '', id);
    setisLoading(true);

    // 拿到请求数据，替换插入的空白消息
    // sse请求;
    const params = {
      conversationId: 'b174384d-af8f-4c79-b555-2aed14358a62',
      messageId: 'd9c2c7f1-8a80-4e5b-9b9d-7f5b43d1d98e',
      parentMessageId: 'a5e8f2d3-6b0f-4c2a-9c3d-1e7f84b5a2b0',
      content: msg,
    };

    // sseRequest(
    //   '/chat/gpt/chat',
    //   params,
    //   (res) => {
    //     console.log('🚀 ~ file: index.jsx:126 ~ onMessage ~ res:', res);
    //     if (res === '[DONE]') {
    //       console.log('结束');
    //       return;
    //     }
    //     if (res) {
    //       const { conversation_id, message } = res;
    //       const content = JSON.parse(message.content.parts[0]);
    //       // setSSEData(content);
    //       setMessages((prevMessages) => {
    //         const newMessages = prevMessages.slice();
    //         const emptyMessageIndex = newMessages.findIndex(
    //           (message) => message.id === id
    //         );
    //         if (emptyMessageIndex !== -1) {
    //           newMessages[emptyMessageIndex] = {
    //             type: 'reply',
    //             content: content,
    //             id,
    //             timestamp: formatDate(new Date()),
    //           };
    //         }
    //         return newMessages;
    //       });
    //       setisLoading(false);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );

    // 模拟请求延迟时间
    // setTimeout(() => {
    //   // const res = await getGpt(msg);
    //   // const res = 'This is an automated reply.回复：' + msg;

    //   const r = random(0, BOT_MSGS.length - 1);
    //   const res = BOT_MSGS[r] + msg;

    //   setMessages((prevMessages) => {
    //     const newMessages = prevMessages.slice();
    //     const emptyMessageIndex = newMessages.findIndex(
    //       (message) => message.id === id
    //     );
    //     if (emptyMessageIndex !== -1) {
    //       newMessages[emptyMessageIndex] = {
    //         type: 'reply',
    //         content: res,
    //         id,
    //         timestamp: formatDate(new Date()),
    //       };
    //     }
    //     return newMessages;
    //   });
    //   setisLoading(false);
    // }, 1000);
  };

  // 插入消息 【sent-发送 reply-回复】
  const insertMessage = (type, content, id) => {
    const newMessage = { type, content, id, timestamp: formatDate(new Date()) };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // 触发父函数
  const handleFooterValue = (msg) => {
    // 前端插入
    insertMessage('sent', msg, 'sent' + Date.now()); //虚拟一个id
    // 后台请求插入
    getGptMsg(msg);
  };

  return (
    <animated.div style={fallIn}>
      <Layout>
        <Sider style={siderStyle} width={siderWidth}>
          <div className="slider-box">
            <div className="slider-header user-select">
              <RollbackOutlined
                style={{ fontSize: '23px' }}
                onClick={() => navigate('/')}
              />
              {/* <AlignRightOutlined style={{ fontSize: '23px' }} /> */}
            </div>
            <div className="slide-groups">
              {groups.map((group) => {
                return (
                  <div
                    key={group.id}
                    className={group.id === activeGroup.id ? 'active' : ''}
                    onClick={() => setActiveGroup(group)}
                  >
                    # {group.name}
                  </div>
                );
              })}
            </div>
          </div>
        </Sider>
        <Content style={contentStyle}>
          {/* {sseData} */}
          <div
            className="user-select"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
            }}
          >
            <AlignRightOutlined
              className="click-scale"
              style={{
                fontSize: '23px',
                marginRight: '10px',
                cursor: 'pointer',
                position: 'absolute',
                transform: siderWidth === 0 ? 'scaleX(-1)' : '',
              }}
              onClick={() => handleSiderWidth()}
            />
            <h2 style={{ textAlign: 'center', flex: '1' }}>
              {activeGroup.name}
            </h2>
          </div>

          <ChatCtx
            className="container-ctx"
            messages={messages}
            isLoading={isLoading}
          />
          <footer className="container-footer">
            <FooterCtx onMsgChange={handleFooterValue} />
          </footer>
        </Content>
      </Layout>
    </animated.div>
  );
}
export default Chat;
