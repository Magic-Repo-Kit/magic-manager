import LoginForm from './loginForm';
import MrFooter from '@/components/mr-footer';
import './index.scss';
import mrkLogo from '@/assets/images/mrk-dark.png';
import loginBc1 from '@/assets/images/login-vr.svg';
import loginBc2 from '@/assets/images/login-chip.svg';

import { Layout, theme } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function Login() {
  return (
    <div className="login-container flx-center">
      <div className="login-form-bc flx-center">
        <div>
          <img
            src={loginBc1}
            style={{
              width: '500px',
              marginRight: '150px',
            }}
          />
          {/* <img src={loginBc2} alt="" /> */}
        </div>
        <LoginForm />
      </div>

      <Header
        style={{
          width: '50%',
          position: 'fixed',
          top: '0',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={mrkLogo} alt="" height="20" />
        <div>
          <a>
            <i className="iconfont mr-menu-4 login-icon"></i>
          </a>
          <a>
            <i className="iconfont mr-duoyuyan login-icon"></i>
          </a>
          <a>
            <i className="iconfont mr-github login-icon"></i>
          </a>
          <a>
            <i className="iconfont mr-lianxiwomen login-icon"></i>
          </a>
        </div>
      </Header>

      <Footer
        style={{
          position: 'fixed',
          bottom: '0',
          background: 'transparent',
          color: '#fff',
        }}
      >
        <div className="text-center flx-justify-around">
          <a className="color-text-fff">帮助</a>
          <a className="color-text-fff">隐私</a>
          <a className="color-text-fff">条款</a>
        </div>
        <MrFooter />
      </Footer>
    </div>
  );
}

export default Login;
