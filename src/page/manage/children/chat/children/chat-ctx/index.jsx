import React, { useState, useRef, useEffect, useContext } from 'react';
import '../../index.scss';
import './chat.scss';
import sseRequest from '@/request/sseRequest';
import TextLoading from '@/components/text-loading';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
// import { throttle } from 'lodash'; //lodash 节流函数
import ajax from '@/request';

// 图片
import userHead from '@/assets/images/user-head.png';
import botHead from '@/assets/images/bot-head.png';
import mrkLogo from '@/assets/images/logo-mrk.png';
// antd组件
import { Input, Select, Badge } from 'antd';

const { TextArea } = Input;

function ChatCtx() {
  //  共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [roleParams, setRoleParams] = useState({
    // 角色列表参数
    pageNo: 1,
    pageSize: 100,
    keywords: '',
  });

  const [roleList, setRoleList] = useState([]); // 角色列表
  const [roleImg, setRoleImg] = useState(''); // 角色头像
  const [roleName, setRoleName] = useState(''); // 角色姓名
  const [roleDescription, setDescription] = useState(''); // 角色功能描述
  const [roleModel, setRoleModel] = useState(''); // 角色基于模型
  const [roleConversationStarters, setConversationStarters] = useState([
    '帮我用Python实现一个计数器',
    '我想写个年终报告',
    '什么是量子力学？',
  ]); // 试试这样问

  // const [msgValue, setMsgValue] = useState(''); //发送消息
  const [isExtended, setIsExtended] = useState(false); // 扩展是否显示

  const [messages, setMessages] = useState([]); // 聊天消息
  const [sumStr, setSumStr] = useState(''); //聊天消息 - 临时存储
  const [isLoading, setIsLoading] = useState(false); // 是否等待
  const chatMainRef = useRef(null);

  const [chatParams, setChatParams] = useState({
    content: '', //	对话内容
    roleId: '1', //角色id , 默认1 ，mrk-3.5
    conversationId: 'd08b777e-f5c2-493f-82ae-060731d1ea80', // 会话id[不传开始新的会话]
    isContext: 2, //是否开启上下文[1:关闭 2:开启]
    contextLength: 30, //上下文长度问答对数量(只有开启上下文生效)[默认20，范围1-100]
    isOnline: 1, //是否联网[1:关闭 2:开启]
  });

  // 阻止默认的换行,(Enter-发送),(Shift + Enter - 换行)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRequestMessage();
    }
  };

  // 获取角色列表
  const getRoleList = async () => {
    try {
      const res = await ajax.get(`/chat/role/list-page`, roleParams);
      if (res.code === 200) {
        if (res.data) {
          const tempRoleList = res.data.list
            ? res.data.list.map((role) => ({
                value: role.id,
                label: role.name,
                description: role.description,
                imageUrl: role.imageUrl,
              }))
            : [];
          setRoleList(tempRoleList);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取模型列表失败');
    }
  };
  // 获取角色详情
  const getRoleDetail = async (roleId) => {
    const id = roleId || chatParams.roleId;
    try {
      const res = await ajax.get(`/chat/role/detail/${id}`);
      if (res.code === 200) {
        if (res.data) {
          console.log('🚀 ~ getRoleDetail ~ res.data:', res.data);
          // 角色简介
          setRoleName(res.data.name);
          setDescription(res.data.description);
          setRoleImg(res.data.imageUrl);
          setRoleImg(res.data.imageUrl);
          setRoleModel(res.data.modelName);
          if (
            res.data.conversationStarters &&
            res.data.conversationStarters.length > 0
          ) {
            setConversationStarters(res.data.conversationStarters);
          }
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取角色详情失败');
    }
  };

  // 切换角色
  const handleChangeSelect = (value) => {
    setChatParams((prevParams) => ({
      ...prevParams,
      roleId: value,
    }));
    getRoleDetail(value);
  };
  // 快捷提问
  const handleFastQuestion = async (question) => {
    console.log('🚀 ~ handleFastQuestion ~ question:', question);

    if (question.trim() !== '') {
      // 更新消息显示数组 - user
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: question, type: 1 },
      ]);

      setIsLoading(true);

      // 请求
      sendMessage(question);
    }
  };

  // 处理请求时的消息
  const handleRequestMessage = () => {
    // 过滤空格
    if (chatParams.content.trim() === '') {
      setChatParams((prevParams) => ({
        ...prevParams,
        content: '',
      }));
      return;
    }
    if (isLoading) {
      return;
    }

    if (chatParams.content.trim() !== '') {
      // 更新消息显示数组 - user
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: chatParams.content, type: 1 },
      ]);
      // 发送之后清掉chatParams
      setChatParams((prevParams) => ({
        ...prevParams,
        content: '',
      }));
      setIsLoading(true);

      // 请求
      sendMessage();
    }
  };
  // 发送消息接口
  const sendMessage = async (question) => {
    // SSE 成功-回调函数
    const onMessage = (event) => {
      if (event.isEnd) {
        console.log('结束');
        setSumStr(''); //清空临时存储
        let newMessage = { message: event.message, type: 2 };
        handleReceiveMessage(newMessage);
        return;
      } else {
        if (event.message) {
          // 字符串累加
          setSumStr((prevSumStr) => prevSumStr + event.message);

          // setSumStr拼接的时候也滚动
          scrollToBottom();
        }
      }
    };
    const onMyError = (error) => {
      console.log('请求异常', error);
      //  将最后一条消息标记为 isError（提问那条）

      // setMessages((prevMessages) => {
      //   const lastMessageIndex = prevMessages.length - 1;
      //   const newMessages = prevMessages.slice();
      //   newMessages[lastMessageIndex] = {
      //     ...newMessages[lastMessageIndex],
      //     isError: true,
      //   };
      //   return newMessages;
      // });

      //回复失败
      let newMessage = {
        message: '网络有点不好，请试试重新提问',
        type: 2,
        isError: true,
      };
      handleReceiveMessage(newMessage);
    };

    // 调用SSE函数
    if (question) {
      // 快速提问
      sseRequest(
        '/chat/gpt/chat-role',
        { ...chatParams, content: question },
        onMessage,
        setIsLoading,
        onMyError
      );
    } else {
      sseRequest(
        '/chat/gpt/chat-role',
        chatParams,
        onMessage,
        setIsLoading,
        onMyError
      );
    }
  };

  // 处理接收到的消息
  const handleReceiveMessage = (messageDiv) => {
    // 过滤 isError 为 true 的项，并添加结束消息到数组末尾
    // setMessages((prevMessages) => {
    //   const filteredMessages = prevMessages.filter((item) => !item.isError);
    //   return [...filteredMessages, messageDiv];
    // });

    // 更新消息数组 - bot
    setMessages((prevMessages) => [...prevMessages, messageDiv]);
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom(); //messages数组有变化就滚动
  }, [messages]);
  useEffect(() => {
    getRoleList();
    getRoleDetail();
  }, []);

  return (
    <div className={`chat-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="chat-select-btn">
        <Select
          defaultValue="1"
          onChange={handleChangeSelect}
          options={roleList}
        />
      </div>

      {/* 聊天 */}
      <main ref={chatMainRef}>
        {messages && messages.length > 0 ? (
          <div className="chat-chat-main">
            {messages.map((item, index) => {
              return (
                <div
                  key={index}
                  className={item.type === 1 ? 'user-msg' : 'bot-msg'}
                >
                  {/* 头像-bot */}
                  {item.type === 1 ? (
                    ''
                  ) : (
                    <img className="bot-head" src={roleImg || botHead} />
                  )}

                  {/* 聊天内容 */}
                  <div className="msg-item">
                    <MarkdownRenderer markdown={item.message} />
                    {/* {item.message} */}
                    {/* 刷新请求 */}
                    {/* {item.isError && index === messages.length - 1 ? (
                    <div
                      className="msg-refush"
                      onClick={throttle(sendMessage, 3000)}
                    >
                      <i className="iconfont mr-refresh-full"></i>
                    </div>
                  ) : (
                    ''
                  )} */}
                  </div>

                  {/* 头像-user */}
                  {item.type === 1 ? (
                    <img className="user-head" src={userHead} />
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className={`bot-msg ${isLoading ? '' : 'hide'}`}>
                <img className="bot-head" src={roleImg || botHead} />
                {/* <div className="msg-item">{sumStr || <TextLoading />}</div> */}
                <div className="msg-item">
                  {sumStr ? (
                    <MarkdownRenderer markdown={sumStr} />
                  ) : (
                    <div style={{ paddingBottom: 8 }}>
                      <TextLoading />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // 没有消息时
          <>
            {/* 人物介绍 */}

            <div className="chat-prompt-box">
              {/* 角色介绍 */}
              <Badge.Ribbon text="简介" color="#4f46e5">
                <div className="chat-prompt-role">
                  <div className="chat-prompt-role-left font-family-dingding">
                    <div>
                      <div className="role-info-name single-omit">
                        <i className="iconfont mr-taocanbanben"></i>
                        <span>{roleName}</span>
                      </div>
                      <div className="role-info-ability multiple-omit">
                        {roleDescription ||
                          '一个功能强大的AI助手，帮你解决各种问题。多模态人工智能！'}
                      </div>
                    </div>

                    <div className="role-info-author">
                      <div className="role-info-title single-omit">
                        <span className="role-info-model">{roleModel}</span>
                        <span className="role-info-model">Creative</span>
                        <span className="role-info-model">创作</span>
                      </div>
                      <div className="flx-align-center single-omit">
                        <span>作者：</span>
                        <img src={userHead} />
                        <span>无敌管理员</span>
                      </div>
                    </div>
                  </div>
                  <div className="chat-prompt-role-right font-family-dingding">
                    <div className="role-info-head">
                      <img src={roleImg || botHead} />
                    </div>
                    <div className="role-info-collect flx-justify-between">
                      {/* 收藏 */}
                      <div className="role-info-star flx-center">
                        <i className="iconfont mr-shoucangtianchong"></i>
                        <span>406</span>
                      </div>
                      {/* 点赞 */}
                      <div className="role-info-star flx-center">
                        <i className="iconfont mr-xihuantianchong"></i>
                        <span>523</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Badge.Ribbon>

              {/* 预设问题 */}
              <div className="chat-prompt-question-box">
                <div className="chat-prompt-title font-family-dingding">
                  试试这样问
                </div>
                <div className="chat-question user-select">
                  {roleConversationStarters &&
                  roleConversationStarters.length > 0
                    ? roleConversationStarters.map((item, index) => (
                        <span
                          key={index}
                          onClick={() => handleFastQuestion(item)}
                        >
                          {item}
                        </span>
                      ))
                    : ''}
                </div>
              </div>
            </div>

            <div className="chat-chat-empty">
              <div className="chat-empty-icon flx-center user-select">
                <img src={mrkLogo} className="mrkLogo" />
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="chat-container-footer">
        <div className="chat-text-send-container">
          {/* 输入 */}
          <div className="chat-text-area-box">
            <TextArea
              style={{
                color: darkMode ? '#fff' : '',
              }}
              value={chatParams.content}
              className={`remove-default-textarea ${
                darkMode ? 'custom-placeholder' : ''
              }`}
              maxLength={50000}
              placeholder="Shift + Enter换行"
              onChange={(e) =>
                setChatParams((prevParams) => ({
                  ...prevParams,
                  content: e.target.value,
                }))
              }
              autoSize={{ maxRows: 10 }}
              onFocus={() => setIsExtended(false)}
              onKeyDown={handleKeyDown} // 监听键盘按键
            />
            {chatParams.content ? (
              ''
            ) : (
              <div className="chat-footer-icon chat-footer-sound">
                <i className="iconfont mr-shengboyuyinxiaoxi"></i>
              </div>
            )}
          </div>
          {/* 添加 / 发送图标 */}

          <div className={`chat-footer-icon chat-footer-send click-jump `}>
            {isLoading ? (
              <i className="iconfont mr-stop stop-scale"></i>
            ) : (
              <>
                {chatParams.content ? (
                  <i
                    className="iconfont mr-gongzuo-jiantoufasonganniu"
                    onClick={handleRequestMessage}
                  ></i>
                ) : (
                  <div
                    className={`${
                      isExtended ? 'add-rotate' : 'reverse-rotate'
                    }`}
                  >
                    <i
                      className="iconfont mr-jia"
                      onClick={() => setIsExtended(!isExtended)}
                    ></i>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* 展开功能 */}
        <div
          className={`chat-text-extend-container ${
            isExtended ? 'isExtended' : ''
          }`}
        >
          <div className="chat-text-extend-item flx-center">
            <div>
              <i className="iconfont mr-tupian1"></i>
            </div>
            <div>照片</div>
          </div>
          <div className="chat-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-wenjianjia1"
                style={{ fontSize: 30 }}
              ></i>
            </div>
            <div>文件</div>
          </div>
          <div className="chat-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-yuyinshuru1"
                style={{ fontSize: 28 }}
              ></i>
            </div>
            <div>语音输入</div>
          </div>
          <div className="chat-text-extend-item flx-center">
            <div>
              <i className="iconfont mr-paishe" style={{ fontSize: 28 }}></i>
            </div>
            <div>拍摄</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ChatCtx;
