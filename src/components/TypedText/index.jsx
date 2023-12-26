import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TypedText = ({ texts }) => {
  const [visible, setVisible] = useState(true);
  const [letterCount, setLetterCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (letterCount === texts[textIndex].length) {
      setTimeout(() => {
        setLetterCount(0);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 4000);
    } else {
      const timeout = setTimeout(() => {
        setLetterCount((prevCount) => prevCount + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [letterCount, texts, textIndex]);
  // 监听删除下标
  useEffect(() => {
    const underscoreInterval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 400);
    return () => clearInterval(underscoreInterval);
  }, []);

  return (
    <div className="typed-text">
      <span>{texts[textIndex].substring(0, letterCount)}</span>
      <div className={`console-underscore ${visible ? '' : 'hidden'}`}>
        &#95;
      </div>
    </div>
  );
};

TypedText.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TypedText;
