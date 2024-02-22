import React, { useContext, useState, useEffect } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ChatCtx from './children/chat-ctx';
import ChatList from './children/chat-list';
import ajax from '@/request';

import { Drawer } from 'antd';

function Chat() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const [conversationId, setConversationId] = useState(''); //当前选中的id
  const [messages, setMessages] = useState([]); // 聊天消息

  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // 开启抽屉
  const onShowDrawer = () => {
    setDrawerOpen(true);
  };
  // 关闭抽屉
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    getChatMessages();
  }, [conversationId]);

  return (
    <div className={`chat-container-box ${darkMode ? 'dark-mode' : ''}`}>
      {/* 头部 */}
      <header>
        <div className="font-family-dingding">面试官</div>
        <div onClick={onShowDrawer}>
          <i className="iconfont mr-more-2 cursor-point"></i>
        </div>
      </header>
      <ChatCtx
        messages={messages}
        setMessages={setMessages}
        conversationId={conversationId}
      />
      {/* 抽屉 */}
      <Drawer
        title="选择"
        onClose={onCloseDrawer}
        open={drawerOpen}
        placement="right"
      >
        <div className="chat-drawer-box">
          <div className="chat-drawer-role-list">
            <div>角色</div>
            <div>角色</div>
            <div>角色</div>
          </div>
          <div>
            <div>聊天纪录</div>
          </div>
        </div>
      </Drawer>
      {/* 侧边栏 */}
      {/* <ChatList
        conversationId={conversationId}
        setConversationId={setConversationId}
      /> */}
    </div>
  );
}

export default Chat;
