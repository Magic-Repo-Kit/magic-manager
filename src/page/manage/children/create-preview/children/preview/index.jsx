import React, { useState, useRef, useEffect } from 'react';
import '../../index.scss';
import './preview.scss';
import ajax from '@/request';
import sseRequest from '@/request/sseRequest';

// antd组件
import { Input, Select } from 'antd';
const { TextArea } = Input;

function Preview() {
  const [msgValue, setMsgValue] = useState(''); //发送消息
  const [isExtended, setIsExtended] = useState(false); // 扩展是否显示

  const [params, setParams] = useState({
    modelName: 'mrk-3.5-turbo',
    temperature: '0.7',
    isShowKnowledge: 1,
    knowledgeId: '1746480158702338049',
    messages: [],
    prompt: '',
    isOnline: 1,
  });
  const [messages, setMessages] = useState([]); // 聊天消息
  const [isTyping, setIsTyping] = useState(false); // 是否正在打字
  const chatMainRef = useRef(null);
  const [isFirstRender, setIsFirstRender] = useState(false);

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
    if (msgValue.trim() !== '') {
      // 更新消息数组 - user
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: msgValue, type: 1 },
      ]);
      setMsgValue('');
      setIsTyping(true);

      // 更新 SSE 请求参数
      setParams((prevParams) => ({
        ...prevParams,
        messages: [...prevParams.messages, { message: msgValue, type: 1 }],
      }));
    }
  };
  // 发送消息接口
  const sendMessage = async () => {
    console.log(params);
    if (params.messages.length === 0) return;

    // 创建新的 div 对象
    let newMessageDiv = { message: '', type: 2 };

    // SSE 成功-回调函数
    const onMessage = (event) => {
      if (event.isEnd) {
        console.log('🚀 ~ onMessage ~ event.message:', event.message);
        console.log('结束');
        if (newMessageDiv.message.trim() !== '') {
          handleReceiveMessage(newMessageDiv);
        }
        return;
      }
      if (event.message) {
        // 逐渐往当前 div 中追加文字
        newMessageDiv.message += event.message;
        console.log('🚀 ~ onMessage ~ newMessageDiv:', newMessageDiv);
        console.log('🚀 ~ onMessage ~ message:', event.message);

        // handleReceiveMessage(newMessageDiv);
      }
    };
    // 调用SSE函数
    await sseRequest('/chat/gpt/chat-preset', params, onMessage);
  };

  // 处理接收到的消息
  const handleReceiveMessage = (messageDiv) => {
    setIsTyping(false);
    // 更新消息数组 - bot
    setMessages((prevMessages) => [...prevMessages, messageDiv]);
    scrollToBottom();
  };

  // 格式化消息(处理 /n处理换行等等)
  const getReaderText = (str) => {
    let matchStr = '';
    try {
      let result = str.match(/data:\s*({.*?})\s*\n/g);
      result.forEach((_) => {
        const matchStrItem = _.match(/data:\s*({.*?})\s*\n/)[1];
        const data = JSON.parse(matchStrItem);
        matchStr += data?.choices[0].delta?.content || '';
      });
    } catch (e) {
      console.log(e);
    }
    return matchStr;
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
  };
  useEffect(() => {
    console.log(isFirstRender);
    if (!isFirstRender) {
      sendMessage();
    } else {
      setIsFirstRender(false);
    }
  }, [params, isFirstRender]);
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
          {messages.map((item, index) => (
            <div key={index} className="preview-chat-msg-box">
              <div className={item.type === 1 ? 'user-msg' : 'bot-msg'}>
                {item.message}
                {/* {item.type === 2 && <div>{item.divContent}</div>}
              {item.type === 1 && <div>{item.message}</div>} */}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="bot-message typing-indicator">正在输入...</div>
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
