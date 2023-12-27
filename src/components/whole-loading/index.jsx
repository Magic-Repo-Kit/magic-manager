import React from 'react';
import './index.scss';

const WholeLoading = ({ isLoading }) => {
  return (
    <div
      className="whole-loading-box"
      style={{
        display: isLoading ? 'block' : 'none',
      }}
    >
      <div className="whole-loading">
        <div className="loader">
          <div className="box box-1">
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="side-top"></div>
          </div>
          <div className="box box-2">
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="side-top"></div>
          </div>
          <div className="box box-3">
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="side-top"></div>
          </div>
          <div className="box box-4">
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="side-top"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeLoading;
