import React, { useState } from 'react';

const SimpleChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const BOT_MSGS = [
    'Hi, how are you?',
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    'Sorry if my answers are not relevant. :))',
    'I feel sleepy! :(',
  ];

  const BOT_IMG = 'https://image.flaticon.com/icons/svg/327/327779.svg';
  const PERSON_IMG = 'https://image.flaticon.com/icons/svg/145/145867.svg';
  const BOT_NAME = 'BOT';
  const PERSON_NAME = 'Sajad';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, 'right', inputText);
    setInputText('');

    botResponse();
  };

  const appendMessage = (name, img, side, text) => {
    const newMessage = {
      name,
      img,
      side,
      text,
      time: formatDate(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const botResponse = () => {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(' ').length * 100;

    setTimeout(() => {
      appendMessage(BOT_NAME, BOT_IMG, 'left', msgText);
    }, delay);
  };

  const formatDate = (date) => {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> SimpleChat
        </div>
        <div className="msger-header-options">
          <span>
            <i className="fas fa-cog"></i>
          </span>
        </div>
      </header>

      <main className="msger-chat">
        {messages.map((message, index) => (
          <div key={index} className={`msg ${message.side}-msg`}>
            <div
              className="msg-img"
              style={{ backgroundImage: `url(${message.img})` }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{message.name}</div>
                <div className="msg-info-time">{message.time}</div>
              </div>

              <div className="msg-text">{message.text}</div>
            </div>
          </div>
        ))}
      </main>

      <form className="msger-inputarea" onSubmit={handleSubmit}>
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="msger-send-btn">
          Send
        </button>
      </form>
    </section>
  );
};

export default SimpleChat;
