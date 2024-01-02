import React from 'react';
import './index.scss';
function HeaderTabs() {
  return (
    <div className="header-tabs">
      <div className="tabs">
        <input type="radio" id="radio-1" name="tabs" checked="" />
        <label className="tab" htmlFor="radio-1">
          Admin
        </label>
        <input type="radio" id="radio-2" name="tabs" />
        <label className="tab" htmlFor="radio-2">
          GPT
        </label>
        <input type="radio" id="radio-3" name="tabs" />
        <label className="tab" htmlFor="radio-3">
          Apps
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
}
export default HeaderTabs;
