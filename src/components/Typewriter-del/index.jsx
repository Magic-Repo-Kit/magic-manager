// 打字机效果-带删除

import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = 100; // 打字速度
  const delay = 1500; // 文字停留时间

  useEffect(() => {
    let currentIndex = 0;
    let timeout;

    const updateText = () => {
      setDisplayText((prevText) => {
        if (!isDeleting) {
          return prevText + text.charAt(prevText.length);
        } else {
          return prevText.slice(0, -1);
        }
      });

      if (!isDeleting) {
        if (displayText === text) {
          setIsDeleting(true);
          timeout = setTimeout(updateText, delay);
        } else {
          timeout = setTimeout(updateText, speed);
        }
      } else {
        if (displayText === '') {
          setIsDeleting(false);
          currentIndex = 0;
          timeout = setTimeout(updateText, speed);
        } else {
          timeout = setTimeout(updateText, speed);
        }
      }
    };

    timeout = setTimeout(updateText, speed);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, displayText, isDeleting]);

  return <div>{displayText}</div>;
};

export default Typewriter;
