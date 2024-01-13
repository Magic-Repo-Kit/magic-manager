import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

// 图片
import knowledgeFile from '@/assets/images/file.png';

function Knowledge() {
  return (
    <div className="knowledge-container">
      <div className="knowledge-title">
        <span>知识库</span>
      </div>
      <main className="knowledge-content">
        <div className="knowledge-content-item">
          <div className="knowledge-item-header">
            <div className="flx-center">
              <img src={knowledgeFile} />
              <span>知识库1</span>
            </div>
            <div>
              <i className="iconfont mr-more-2"></i>
            </div>
          </div>
          <div className="knowledge-item-content">这是一个XXX知识库</div>
          <div className="knowledge-item-footer">
            <div className="flx-center">
              <i className="iconfont mr-tuandui2"></i>
              <span>团队</span>
            </div>
            <div className="flx-center">
              <i className="iconfont mr-wenjiantong"></i>
              <span>文件夹</span>
            </div>
          </div>
        </div>
        <div className="knowledge-content-item">
          <div className="knowledge-item-header">
            <div className="flx-center">
              <img src={knowledgeFile} />
              <span>知识库2</span>
            </div>
            <div>
              <i className="iconfont mr-more-2"></i>
            </div>
          </div>
          <div className="knowledge-item-content">这是一个XXX知识库</div>
          <div className="knowledge-item-footer">
            <div className="flx-center">
              <i className="iconfont mr-yisuo"></i>
              <span>私有</span>
            </div>
            <div className="flx-center">
              <i className="iconfont mr-jishiben"></i>
              <span>文本</span>
            </div>
          </div>
        </div>
        <div className="knowledge-content-item">
          <div className="knowledge-item-header">
            <div className="flx-center">
              <img src={knowledgeFile} />
              <span>知识库1</span>
            </div>
            <div>
              <i className="iconfont mr-more-2"></i>
            </div>
          </div>
          <div className="knowledge-item-content">这是一个XXX知识库</div>
          <div className="knowledge-item-footer">
            <div className="flx-center">
              <i className="iconfont mr-tuandui2"></i>
              <span>团队</span>
            </div>
            <div className="flx-center">
              <i className="iconfont mr-wenjiantong"></i>
              <span>文件夹</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Knowledge;
