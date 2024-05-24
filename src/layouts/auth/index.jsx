import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import DarkModeToggle from '@/components/DarkModeToggle';
import WholeLoading from '@/components/whole-loading';
import { WholeLoadingContext } from '@/components/whole-loading-provider'; //全局Loading控制
import SwitchBtn from '@/components/switch-btn';
import BtnLogin from '@/components/BtnLogin';
import CubeBg from '@/components/cube-bg';
import TypedText from '@/components/TypedText';
import FormModal from './FormModal';
import IconList from './IconList';
import Introduce from './introduce'; //功能介绍
// import MagicRepoKit from './magic-repo-kit';
// import Rocket from '@/components/Rocket';
// 方法
import { platformLoginAPI } from '@/request/auth';
import { setAccessToken, setRefreshToken } from '@/utils/tools';
// 图片
import mrkLogo from '@/assets/images/logo-mrk.png';
import mrkLight from '@/assets/images/mrk-title-light.png';
import mrkDark from '@/assets/images/mrk-title-dark.png';
import loginMain from '@/assets/images/login-main.png';
// import headerJS from '@/assets/images/header-js.png';
// import loginComputer from '@/assets/images/login-computer.png';
// import loginHeadset from '@/assets/images/login-headset.png';

// antd组件
import { Modal, message } from 'antd';

export const IsRegisterContext = createContext(); // 创建登录/注册上下文
export const IsForgetPwdContext = createContext(); // 创建忘记密码上下文

function Auth() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const { isLoading, setIsLoading } = useContext(WholeLoadingContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false); // 忘记密码

  const navigate = useNavigate();
  const locationObj = useLocation();

  // 监听地址栏 | 判断是否有第三方参数
  useEffect(() => {
    const fetchData = async () => {
      // 从地址栏里面获取参数
      const urlParams = new URLSearchParams(locationObj.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        setIsLoading(true);
        try {
          const res = await platformLoginAPI({
            type: localStorage.getItem('platformType'),
            code,
            state,
          });
          if (res.code === 200) {
            const { access_token, refresh_token } = res.data;
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            navigate('/admin');
            message.success('登录成功');
          } else {
            throw new Error(res.msg || '登录失败');
          }
        } catch (error) {
          message.error(error.msg || '登录失败');

          // 如果跳转失败，清理URL参数，并替换路径
          urlParams.delete('code');
          urlParams.delete('state');
          const newUrl = `${locationObj.pathname}`;
          window.history.replaceState({}, '', newUrl);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      }
    };
    fetchData();
  }, [locationObj.search, locationObj.pathname]);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <header
        style={{ backdropFilter: isModalVisible ? 'none' : 'blur(20px)' }}
      >
        <div className="header-content">
          <div className="mrk-logo">
            <img src={mrkLogo} alt="" className="mrkLogo" />
            <img src={darkMode ? mrkDark : mrkLight} className="mrkTitle" />
          </div>

          <div className="btn-box">
            <DarkModeToggle size="20px" />
            <div className="space-line"></div>
            <div
              onClick={() => {
                setIsRegister(false);
                setIsForgetPwd(false);
                setIsModalVisible(true);
              }}
            >
              {/* <BtnLogin iconName="mr-login-full" content="Login" /> */}
              <BtnLogin iconName="mr-login-full" content="登录" />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="rocket-box">
          <div className="fade-in-animation">
            <div className="rocket-bg">
              <CubeBg />
            </div>
          </div>

          <div className="rocket-container">
            <section>
              <div className="login-main-explain">
                <div className="fade-slide-in-animation">
                  <div className="ai-title font-family-dingding">
                    <span>百宝袋</span>
                    <i className="iconfont mr-icon_AI ai-icon"></i>
                  </div>
                  <div className="ai-subtitle font-family-dingding">
                    MagicRepokit
                  </div>
                  <div className="ai-point font-family-dingding">
                    自由
                    <div className="space-line"></div>
                    简单
                    <div className="space-line"></div>
                    高效
                  </div>
                </div>

                <div className="ai-explain font-family-dingding fade-slide-in-animation">
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

                <div className="explain-btn user-select font-family-dingding fade-slide-in-animation-bottom">
                  <div onClick={() => setIsModalVisible(true)}>快速体验</div>
                  <div
                    onClick={() => {
                      window.location.assign(
                        'https://mrk-doc.auroralpixel.world/'
                      );
                      //  window.open(
                      //    'https://mrk-doc.auroralpixel.world/',
                      //    '_blank'
                      //  );
                    }}
                  >
                    <div className="explain-text">查看文档</div>
                  </div>
                </div>
                <div className="fade-slide-in-animation-bottom">
                  <IconList />
                </div>
              </div>
            </section>
            <section>
              <div className="login-main">
                <img src={loginMain} className="float-up-down" />
              </div>
            </section>
          </div>
        </div>
        {/* 功能介绍 */}
        <div className="rocket-introduce user-select">
          <Introduce />
        </div>
        {/* <div className="login-magicrepokit">
          <img style={{ width: '100%' }} src={headerJS} />
        </div> */}
        {/* <div className="login-magicrepokit">
          <img
            style={{ width: '300px' }}
            src={loginComputer}
            className="float-up-down"
          />
        </div>
        <div className="login-magicrepokit">
          <img
            src={loginHeadset}
            style={{ width: '300px' }}
            className="float-up-down"
          />
        </div> */}
        {/* <div>
          <Rocket />
        </div> */}
        {/* <div className="login-magicrepokit">
          <MagicRepoKit />
        </div> */}
      </main>

      {/* 弹框 */}
      <Modal
        title={
          isForgetPwd ? (
            '重置密码'
          ) : (
            <div className="form-switch">
              <SwitchBtn
                isRegister={isRegister}
                handRegisterChange={() => setIsRegister(!isRegister)}
              />
            </div>
          )
        }
        centered
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer=""
      >
        <IsForgetPwdContext.Provider value={{ isForgetPwd, setIsForgetPwd }}>
          <IsRegisterContext.Provider value={{ isRegister, setIsRegister }}>
            <FormModal />
          </IsRegisterContext.Provider>
        </IsForgetPwdContext.Provider>
      </Modal>
      {/* loading */}
      <WholeLoading isLoading={isLoading} />
    </div>
  );
}

export default Auth;
