import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import ajax from '@/request';

// antd组件
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function ChatList({ conversationId, setConversationId }) {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [titleList, setTitleList] = useState([]);

  const [titleTotal, setTitleTotal] = useState(null);

  const [listParams, setListParams] = useState({
    pageNo: 1,
    pageSize: 100,
  });
  // 获取会话列表list
  const getTitleList = async () => {
    try {
      const res = await ajax.get(`/chat/gpt/page-conversation`, listParams);
      if (res.code === 200) {
        if (res.data) {
          setTitleList(res.data.list);
          setTitleTotal(res.data.total);
          // 默认设置第一个会话为激活状态
          if (!conversationId) {
            setConversationId(res.data.list[0]?.conversationId);
          }
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取会话列表失败');
    }
  };

  // 点击会话id的时候
  const handleClickItem = (id) => {
    if (conversationId === id) return;
    setConversationId(id);
    getTitleList();
  };
  // 新增会话
  const handleAddNewChat = () => {
    // 检查是否已经有一个"New Chat"存在
    const isNewChatExists = titleList.some(
      (chat) => chat.conversationId === ''
    );
    if (isNewChatExists) return;

    const newChat = {
      conversationId: '',
      title: 'New Chat',
    };
    // 将添加新会话到开头
    setTitleList([newChat, ...titleList]);

    // 将当前激活的会话ID设置为空，表示新会话是当前选中的会话
    setConversationId('');
  };

  useEffect(() => {
    getTitleList();
  }, []);

  return (
    <nav className={`chat-container-nav ${isNavHidden ? 'hidden' : ''}`}>
      <header>
        <div
          className="click-app-box chat-add-header"
          onClick={handleAddNewChat}
        >
          <i className="iconfont mr-plus-full"></i>
        </div>
      </header>
      <main>
        <div className="chat-name-list-box user-select">
          {titleList && titleList.length > 0 ? (
            titleList.map((item) => (
              <div
                className={`chat-name-list-item flx-justify-between ${
                  item.conversationId === conversationId ? 'active' : ''
                }`}
                key={item.conversationId}
                onClick={() => handleClickItem(item.conversationId)} // 当点击时，设置当前项为激活状态
              >
                <div className="single-omit">{item.title}</div>
                <div className="chat-name-item-icon">
                  <DownOutlined />
                </div>
              </div>
            ))
          ) : (
            // 如果数组为空时，默认添加一条
            <div className="chat-name-list-item flx-justify-between active">
              <div className="single-omit">New Chat</div>
              <div className="chat-name-item-icon">
                <DownOutlined />
              </div>
            </div>
          )}
        </div>
      </main>
    </nav>
  );
}

export default ChatList;
