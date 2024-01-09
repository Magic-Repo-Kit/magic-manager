import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function HeaderTabs() {
  useEffect(() => {
    // 检查本地存储中是否有选中的值
    const selectedTab = localStorage.getItem('selectedTab');
    if (selectedTab) {
      const radio = document.getElementById(selectedTab);
      if (radio) {
        radio.checked = true;
      }
    }
  }, []);

  const handleTabChange = (event) => {
    // 更新本地存储的选中值
    localStorage.setItem('selectedTab', event.target.id);
  };
  return (
    <div className="header-tabs">
      <div className="tabs">
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          defaultChecked
          onChange={handleTabChange}
        />
        <Link to="manage" className="custom-link">
          <label className="tab" htmlFor="radio-1">
            <i className="iconfont mr-menu-4 tab-icon"></i>
            百宝袋
          </label>
        </Link>
        <input
          type="radio"
          id="radio-2"
          name="tabs"
          onChange={handleTabChange}
        />
        <Link to="gpt" className="custom-link">
          <label className="tab" htmlFor="radio-2">
            <i className="iconfont mr-chatgpt tab-icon"></i>
            GPT
          </label>
        </Link>
        <input
          type="radio"
          id="radio-3"
          name="tabs"
          onChange={handleTabChange}
        />
        <Link to="chat" className="custom-link">
          <label className="tab" htmlFor="radio-3">
            <i className="iconfont mr-number-sign tab-icon"></i>
            聊天
          </label>
        </Link>
        <input
          type="radio"
          id="radio-4"
          name="tabs"
          onChange={handleTabChange}
        />
        <Link to="/apps" className="custom-link">
          <label className="tab" htmlFor="radio-4">
            <i className="iconfont mr-home-3 tab-icon"></i>
            Apps
          </label>
        </Link>
        {/* 阴影 */}
        <span className="glider"></span>
      </div>
    </div>
  );
}
export default HeaderTabs;
