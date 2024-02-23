import React, { useContext, useState, useEffect } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ChatCtx from './children/chat-ctx';
import ChatList from './children/chat-list';
import ajax from '@/request';

// 图片
import botHead from '@/assets/images/bot-head.png';

import { Drawer, Popover } from 'antd';

function Chat() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const [conversationId, setConversationId] = useState(''); //当前选中的id
  const [messages, setMessages] = useState([]); // 聊天消息

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roleList, setRoleList] = useState([]); // 角色列表
  const [selectRole, setSelectRole] = useState(''); //选中的角色id

  const [roleParams, setRoleParams] = useState({
    // 角色列表参数
    pageNo: 1,
    pageSize: 100,
    keywords: '',
  });

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

  // 获取角色列表
  const getRoleList = async () => {
    try {
      const res = await ajax.get(`/chat/role/list-page`, roleParams);
      if (res.code === 200) {
        if (res.data) {
          setRoleList(res.data.list || []);
          if (res.data.list.length > 0) {
            setSelectRole(res.data.list[0].id); // 设置选中的角色为第一个角色的id
          }
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取模型列表失败');
    }
  };
  // 选择角色
  const handleRoleClick = (roleId) => {
    setSelectRole(roleId);
  };

  useEffect(() => {
    getChatMessages();
  }, [conversationId]);

  useEffect(() => {
    getRoleList();
  }, []);

  return (
    <div className={`chat-container-box ${darkMode ? 'dark-mode' : ''}`}>
      {/* 头部 */}
      <header>
        <Popover
          arrow={false}
          placement="bottomLeft"
          content={
            <div
              className="chat-role-list"
              style={{
                background: darkMode ? '#2f2f2f' : '',
                color: darkMode ? '#fff' : '',
              }}
            >
              {roleList &&
                roleList.map((role) => (
                  <div key={role.id} onClick={() => handleRoleClick(role.id)}>
                    <img src={role.imageUrl || botHead}></img>
                    <div className="chat-role-list-name single-omit">
                      {role.name}
                    </div>
                    {/* <div className="chat-role-list-checked"></div> */}
                    {role.id === selectRole && (
                      <div className="chat-role-list-checked"></div>
                    )}
                  </div>
                ))}
            </div>
          }
        >
          <div className="font-family-dingding chat-header-role user-select">
            面试官
          </div>
        </Popover>

        <div onClick={onShowDrawer}>
          <i className="iconfont mr-more-2 cursor-point"></i>
        </div>
        {/* 角色下拉 */}
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
