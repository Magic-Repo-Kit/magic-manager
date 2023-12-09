import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex === text.length - 1) {
        setDisplayText(text); // 当currentIndex等于text.length-1时，直接显示完整的text
        clearInterval(timer);
      } else {
        setDisplayText((prevText) => prevText + text.charAt(prevText.length));
        currentIndex++;
      }
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [text]);

  return <div>{displayText}</div>;
};

export default Typewriter;
