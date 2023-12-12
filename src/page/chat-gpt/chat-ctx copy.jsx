import React, { useState, useEffect } from 'react';
import './chat.scss';

const ChatCtx = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    fakeMessage(); // 模拟收到新消息
  }, []);

  const updateScrollbar = () => {
    // 更新滚动条
    const chatContainer = document.querySelector('.messages-content');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const setDate = () => {
    // 设置日期时间
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timestamp = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return timestamp;
  };

  const insertMessage = (content, type) => {
    const timestamp = setDate();
    const newMessage = { content, type, timestamp };
    setMessages([...messages, newMessage]);
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSubmit = () => {
    if (messageInput.trim() !== '') {
      insertMessage(messageInput, 'sent');
      setMessageInput('');

      // 模拟收到对方回复的延迟
      setTimeout(() => {
        insertMessage('This is an automated reply.', '  ');
      }, 1000);
    }
  };

  const fakeMessage = () => {
    // 模拟收到新消息
    insertMessage('Hello!', 'reply');

    setTimeout(() => {
      insertMessage('How are you?', 'reply');
    }, 1000);

    setTimeout(() => {
      insertMessage('I hope you are doing well.', 'reply');
    }, 2000);
  };

  return (
    <div className="chat">
      <div className="messages">
        <div className="messages-content">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.content}
              <div className="timestamp">{message.timestamp}</div>
              <figure className="avatar">
                <img src={message.avatar} alt="User Avatar" />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="message-box">
        <textarea
          type="text"
          className="message-input"
          placeholder="Type message..."
          value={messageInput}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="message-submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatCtx;
