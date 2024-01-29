import React, { useState, useRef, useEffect } from 'react';
import '../../index.scss';
import './preview.scss';
import sseRequest from '@/request/sseRequest';
import TextLoading from '@/components/text-loading';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// 图片
import userHead from '@/assets/images/user-head.png';
import botHead from '@/assets/images/bot-head.png';
// antd组件
import { Input, Select } from 'antd';
const { TextArea } = Input;

function Preview() {
  const [msgValue, setMsgValue] = useState(''); //发送消息
  const [isExtended, setIsExtended] = useState(false); // 扩展是否显示

  const [messages, setMessages] = useState([]); // 聊天消息 - 全局
  const messagesRef = useRef([]); // 拿到最新的messages值
  const [sumStr, setSumStr] = useState(''); //聊天消息 - 临时存储
  const [isLoading, setIsLoading] = useState(false); // 是否等待
  const chatMainRef = useRef(null);

  // 阻止默认的换行,(Enter-发送),(Shift + Enter - 换行)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRequestMessage();
    }
  };
  // 模型选择
  const handleChangeModal = (value) => {
    console.log(`selected ${value}`);
  };

  // 处理请求时的消息
  const handleRequestMessage = () => {
    // 过滤空格
    if (msgValue.trim() === '') {
      setMsgValue('');
      return;
    }
    if (isLoading) {
      return;
    }

    if (msgValue.trim() !== '') {
      // 更新消息显示数组 - user
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { message: msgValue, type: 1 }];
        messagesRef.current = newMessages; //用messagesRef.current存储 - 请求用(解决useState副作用)
        return newMessages;
      });
      setMsgValue('');
      setIsLoading(true);

      // 请求
      sendMessage();
    }
  };
  // 发送消息接口
  const sendMessage = async () => {
    const params = {
      modelName: 'mrk-3.5-turbo',
      temperature: '0.7',
      isShowKnowledge: 1,
      knowledgeId: '1746480158702338049',
      messages: messagesRef.current,
      prompt: '',
      isOnline: 1,
    };

    // SSE 成功-回调函数
    const onMessage = (event) => {
      if (event.isEnd) {
        setIsLoading(false);
        console.log('结束');
        setSumStr(''); //清空临时存储
        let newMessage = { message: event.message, type: 2 };
        handleReceiveMessage(newMessage);
        return;
      } else {
        if (event.message) {
          // console.log('🚀 ~ onMessage ~ message:', event.message);

          // 字符串累加
          setSumStr((prevSumStr) => prevSumStr + event.message);
          // setSumStr拼接的时候也滚动
          scrollToBottom();
        }
      }
    };
    const onMyError = (error) => {
      console.log('请求异常', error);
      //回复失败
      let newMessage = {
        message: '网络有点不好，请试试重新提问',
        type: 2,
        isError: true,
      };
      handleReceiveMessage(newMessage);
    };

    // 调用SSE函数
    sseRequest(
      '/chat/gpt/chat-preset',
      params,
      onMessage,
      setIsLoading,
      onMyError
    );
  };

  // 处理接收到的消息
  const handleReceiveMessage = (messageDiv) => {
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

  return (
    <div className="preview-container">
      <header>
        <div className="flx-justify-between">
          <div className="font-family-dingding">调试与预览</div>
          <div>
            <Select
              size="small"
              defaultValue="GPT3.5"
              onChange={handleChangeModal}
              options={[
                {
                  value: 'GPT3.5',
                  label: 'GPT3.5',
                },
                {
                  value: 'GPT4.0',
                  label: 'GPT4.0',
                },
              ]}
            />
          </div>
        </div>
        <div className="preview-prompt-box">
          <div className="flx-align-center">
            <i className="iconfont mr-mofabang"></i>
            <div className="gradient-text-3">提示词预览</div>
          </div>
          <div className="preview-prompt-text">
            提示词是与人工智能（AI）对话系统进行交互时提供的指导性文本，它可以帮助我们更好地与AI进行交流。通过编写清晰、明确的提示词，我们能够准确表达自己的意图和问题，从而得到系统更精确的回答。Prompt
            的好坏直接影响到AI对话的效果和用户体验。
          </div>
        </div>
      </header>
      {/* 聊天 */}
      <main ref={chatMainRef}>
        <div className="preview-chat-main">
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
                  <img className="bot-head" src={botHead} />
                )}

                {/* 聊天内容 */}
                <div className="msg-item">
                  <MarkdownRenderer markdown={item.message} />
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
            <div className="bot-msg">
              <img className="bot-head" src={botHead} />
              <div className="msg-item">
                {<MarkdownRenderer markdown={sumStr} /> || <TextLoading />}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="preview-container-footer">
        <div className="preview-text-send-container">
          {/* 输入 */}
          <div className="preview-text-area-box">
            <TextArea
              value={msgValue}
              className="remove-default-textarea"
              maxLength={1000}
              placeholder="Shift + Enter换行"
              onChange={(e) => setMsgValue(e.target.value)}
              autoSize={{ maxRows: 10 }}
              onFocus={() => setIsExtended(false)}
              onKeyDown={handleKeyDown} // 监听键盘按键
            />
            {msgValue ? (
              ''
            ) : (
              <div className="preview-footer-icon preview-footer-sound">
                <i className="iconfont mr-shengboyuyinxiaoxi"></i>
              </div>
            )}
          </div>
          {/* 添加 / 发送图标 */}
          <div
            className={`preview-footer-icon preview-footer-send click-jump `}
          >
            {msgValue ? (
              <i
                className="iconfont mr-gongzuo-jiantoufasonganniu"
                onClick={handleRequestMessage}
              ></i>
            ) : (
              <div
                className={`${isExtended ? 'add-rotate' : 'reverse-rotate'}`}
              >
                <i
                  className="iconfont mr-jia"
                  onClick={() => setIsExtended(!isExtended)}
                ></i>
              </div>
            )}
          </div>
        </div>
        {/* 展开功能 */}
        <div
          className={`preview-text-extend-container ${
            isExtended ? 'isExtended' : ''
          }`}
        >
          <div className="preview-text-extend-item flx-center">
            <div>
              <i className="iconfont mr-tupian1"></i>
            </div>
            <div>照片</div>
          </div>
          <div className="preview-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-wenjianjia1"
                style={{ fontSize: 30 }}
              ></i>
            </div>
            <div>文件</div>
          </div>
          <div className="preview-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-yuyinshuru1"
                style={{ fontSize: 28 }}
              ></i>
            </div>
            <div>语音输入</div>
          </div>
          <div className="preview-text-extend-item flx-center">
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

export default Preview;
