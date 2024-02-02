import React, { useContext, useState, useEffect } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ChatCtx from './children/chat-ctx';
import ChatList from './children/chat-list';
import ajax from '@/request';

function Chat() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  // const [isNavHidden, setIsNavHidden] = useState(false);
  const [conversationId, setConversationId] = useState(''); //当前选中的id
  const [messages, setMessages] = useState([]); // 聊天消息
  // 获取对话详情
  const getChatMessages = async () => {
    try {
      const res = await ajax.get(
        `/chat/gpt/list-conversation-detail?conversationId=${conversationId}`
      );
      if (res.code === 200) {
        if (res.data) {
          setMessages(res.data);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取对话详情失败');
    }
  };

  useEffect(() => {
    getChatMessages();
  }, [conversationId]);

  return (
    <div className={`chat-container-box ${darkMode ? 'dark-mode' : ''}`}>
      <ChatCtx
        messages={messages}
        setMessages={setMessages}
        conversationId={conversationId}
      />
      {/* 侧边栏 */}
      <ChatList
        conversationId={conversationId}
        setConversationId={setConversationId}
      />
    </div>
  );
}

export default Chat;
