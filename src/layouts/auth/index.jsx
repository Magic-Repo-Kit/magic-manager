import React, { useState, useEffect, useContext } from 'react';
import './index.scss';

import { DarkModeContext } from '@/components/DarkModeProvider';
import DarkModeToggle from '@/components/DarkModeToggle';
import BtnLogin from '@/components/BtnLogin';
import CubeBg from '@/components/cube-bg';
import TypedText from '@/components/TypedText';

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
        <section>
          <div className="login-main-explain">
            <div className="ai-title font-family-dingding">
              <span>百宝袋</span>
              <i className="iconfont mr-icon_AI ai-icon"></i>
            </div>

            <div className="ai-explain">
              {/* MagicRepokit 是一个面向 AI 的多功能工具箱。 */}
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
            <div className="ai-introduce"></div>
            {/* <div>下一个面向AI的工具百宝袋</div> */}
            {/* <div className="ai-introduce">
              <div>
                智能扩展：提供了智能模型的扩展，增强了其处理和交互能力。
              </div>

              <p>
                智能扩展：LangChain
                提供了智能模型的扩展，增强了其处理和交互能力。
                <br />
                数据融合：实现了数据源与模型的有效融合，增强了信息处理的深度和广度。
                <br />
                交互增强：优化了用户与模型的交互体验，提高了响应的准确性和相关性。
                <br />
                功能丰富：引入了多样化的功能，拓宽了语言模型的应用场景。 <br />
                开源共享：作为一个开源项目，鼓励社区参与和共同发展。 <br />
                创新引领：代表了人工智能和自然语言处理领域的创新方向。
              </p>
            </div> */}

            <div className="explain-btn">快速体验</div>
            <div className="explain-btn">阅读文档</div>
          </div>
        </section>
        <section>
          <div className="login-main-box">
            <div className="loginBg">
              <CubeBg />
            </div>
            <div className="loginMain">
              <img src={loginMain} className="float-up-down " />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
