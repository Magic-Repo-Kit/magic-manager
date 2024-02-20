import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //渲染子路由
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';

import { IntlContext } from '@/components/IntlProvider';
import { createIntlObject } from '@/i18n';

// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';

const MrHeader = () => {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const { currentIntl, setCurrentIntl } = useContext(IntlContext);

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
            className="admin-switch flx-center"
            onClick={() =>
              setCurrentIntl(
                createIntlObject(currentIntl.locale === 'en' ? 'zh' : 'en')
              )
            }
          >
            <i className="iconfont mr-qiehuanyuyan"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MrHeader;
