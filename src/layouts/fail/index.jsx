import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function Fail() {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    }, 1000);

    if (countDown === 0) {
      navigate('/admin');
    }
    // 清除定时器
    return () => clearInterval(interval);
  }, [countDown, navigate]);

  const handleClick = () => {
    navigate('/admin');
  };
  return (
    <div className="fail-container">
      <div className="fail-button">
        <Button type="link" onClick={handleClick}>
          点击去往首页
        </Button>
        倒计时{countDown}s...
      </div>
    </div>
  );
}

export default Fail;
