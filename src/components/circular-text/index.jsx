import React from 'react';
import './index.scss';
const CircularText = ({ text, color, style }) => {
  return (
    <div className="circular rotate-move-infinite" style={style}>
      <svg viewBox="0 0 50 50">
        <path d="M 0,42 a 42,42 0 1,1 0,1 z" id="circle" />

        <text>
          <textPath xlinkHref="#circle" fill={color}>
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularText;
