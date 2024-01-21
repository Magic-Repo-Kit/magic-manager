import React from 'react';
import './index.scss';
const MrSearch = () => {
  return (
    <div className="mr-search-container">
      <div class="input-wrapper">
        <div className="icon-search">
          <i className="iconfont mr-search-1"></i>
        </div>

        <input placeholder="搜索" class="input" name="text" type="text"></input>
      </div>
    </div>
  );
};

export default MrSearch;
