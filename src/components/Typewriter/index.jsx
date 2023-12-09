import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let timer;

    const startTyping = () => {
      if (currentIndex === text.length) {
        clearInterval(timer);
        setTimeout(() => {
          setDisplayText('');
          currentIndex = 0;
          timer = setInterval(startTyping, 200); // 重复显示
        }, 2000); // 文字停留时间
      } else {
        setDisplayText((prevText) => prevText + text.charAt(prevText.length));
        currentIndex++;
      }
    };

    timer = setInterval(startTyping, 200);

    return () => {
      clearInterval(timer);
    };
  }, [text]);

  return <div>{displayText}</div>;
};

export default Typewriter;
