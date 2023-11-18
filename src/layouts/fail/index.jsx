import React, { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
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
      <Result
        className="fail-result"
        status="404"
        title="404"
        subTitle={
          <span>抱歉，您访问的页面不存在，{countDown}s后将前往首页。</span>
        }
        extra={
          <Button type="primary" onClick={handleClick}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default Fail;
