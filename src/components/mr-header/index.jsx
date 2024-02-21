import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';

import { IntlContext } from '@/components/IntlProvider';
import { createIntlObject } from '@/i18n';

import { throttle } from 'lodash'; //lodash 节流函数

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';

const MrHeader = () => {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const { currentIntl, setCurrentIntl } = useContext(IntlContext);

  const handleSwitchLocale = throttle(() => {
    console.log(11);
    setCurrentIntl(createIntlObject(currentIntl.locale === 'en' ? 'zh' : 'en'));
  }, 1000); // 设置节流时间间隔为1000ms

  return (
    <header className="mr-header-container">
      <div className="header-content">
        <div className="mrk-logo">
          <img src={mrkLogo} alt="" className="mrkLogo" />
          <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
        </div>
        <div className="btn-box">
          <DarkModeToggle size="20px" />
          <div className="space-line"></div>
          {/* 语言切换 */}
          <div
            className={`admin-switch flx-center ${
              currentIntl.locale === 'en' ? 'rotate-en' : 'rotate-zh'
            }`}
            onClick={handleSwitchLocale}
          >
            <i className="iconfont mr-qiehuanyuyan"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MrHeader;
