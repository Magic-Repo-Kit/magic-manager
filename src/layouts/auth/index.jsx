import React, { useState, useEffect, useContext } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
import BtnLogin from '@/components/BtnLogin';
import CubeBg from '@/components/cube-bg';
import TypedText from '@/components/TypedText';
import IconList from './IconList';

import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
import loginMain from '@/assets/images/login-main.png';

function Login() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-content">
          <div className="mrk-logo">
            <img src={mrkLogo} alt="" className="mrkLogo" />
            <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
          </div>

          <div className="btn-box">
            <DarkModeToggle size="20px" />
            <div className="space-line"></div>
            <BtnLogin iconName="mr-login-full" content="Login" />
          </div>
        </div>
      </header>
      <main>
        <div className="rocket-box">
          <div className="rocket-bg">
            <CubeBg />
          </div>
          <div className="rocket-container">
            <section>
              <div className="login-main-explain">
                <div className="ai-title font-family-dingding">
                  <span>百宝袋</span>
                  <i className="iconfont mr-icon_AI ai-icon"></i>
                </div>
                <div className="ai-subtitle font-family-dingding">
                  MagicRepokit
                </div>
                <div className="ai-point">
                  自由
                  <div className="space-line"></div>
                  简单
                  <div className="space-line"></div>
                  高效
                </div>

                <div className="ai-explain">
                  <TypedText
                    texts={[
                      'MRK',
                      'MagicRepokit 是一个面向 AI 的多功能工具箱。',
                      '引入了多样化的功能，拓宽了语言模型的应用场景。',
                      '提供了智能模型交互，实现了数据源与模型的有效融合。',
                      '人工智能和自然语言处理领域的创新方向，',
                      '作为一个开源项目，鼓励社区参与和共同发展。',
                      '下一个 AI 工具百宝袋。MRK🚀',
                    ]}
                  />
                </div>

                <div className="explain-btn user-select">
                  <div>快速体验</div>
                  <div
                    onClick={() => {
                      window.location.assign(
                        'https://mrk-doc.auroralpixel.world/'
                      );
                    }}
                  >
                    <div className="explain-text">查看文档</div>
                  </div>
                </div>
                <div>
                  <IconList />
                </div>
              </div>
            </section>
            <section>
              <div className="login-main">
                <img src={loginMain} className="float-up-down " />
              </div>
            </section>
          </div>
        </div>
        <div className="rocket-introduce">
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-shujujiekou"></i>
              </div>
              <div className="article-header font-family-dingding">
                智能扩展
              </div>
              <div className="article-ctx">
                提供了智能模型的扩展，增强了其处理和交互能力。
              </div>
            </div>
          </article>
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-shujucaiji"></i>
              </div>
              <div className="article-header font-family-dingding">
                数据融合
              </div>
              <div className="article-ctx">
                实现了数据源与模型的有效融合，增强了信息处理的深度和广度。
              </div>
            </div>
          </article>
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-renjijiaohu"></i>
              </div>
              <div className="article-header font-family-dingding">
                交互增强
              </div>
              <div className="article-ctx">
                优化了用户与模型的交互体验，提高了响应的准确性和相关性。
              </div>
            </div>
          </article>
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-kuozhangongneng"></i>
              </div>
              <div className="article-header font-family-dingding">
                功能丰富
              </div>
              <div className="article-ctx">
                引入了多样化的功能，拓宽了语言模型的应用场景。
              </div>
            </div>
          </article>
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-insert_tag_field"></i>
              </div>
              <div className="article-header font-family-dingding">
                开源共享
              </div>
              <div className="article-ctx">
                作为一个开源项目，鼓励社区参与和共同发展。
              </div>
            </div>
          </article>
          <article>
            <div className="article-container">
              <div className="article-icon">
                <i className="iconfont mr-1huojian"></i>
              </div>
              <div className="article-header font-family-dingding">
                创新引领
              </div>
              <div className="article-ctx">
                代表了人工智能和自然语言处理领域的创新方向。
              </div>
            </div>
          </article>
        </div>
        <div className="rocket-"></div>
      </main>
    </div>
  );
}

export default Login;
