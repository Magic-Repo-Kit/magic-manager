import LoginForm from './loginForm';
import MrFooter from '@/components/mr-footer';
import './index.scss';
import mrkLogo from '@/assets/images/mrk-dark.png';
import loginBc1 from '@/assets/images/login-vr.svg';

import { Layout, Tooltip } from 'antd';
const { Header, Footer } = Layout;

function Login() {
  const lines = ['top', 'right', 'bottom', 'left'];
  return (
    <div className="login-container flx-center">
      <div className="login-form-bc flx-center">
        {lines.map((index) => (
          <div key={index} className="line"></div>
        ))}
        <div className="login-form-left">
          <img
            src={loginBc1}
            style={{
              width: '500px',
              marginRight: '150px',
            }}
          />
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
          <Tooltip title="全屏" color="transparent">
            <a>
              <i className="iconfont mr-menu-4 login-icon"></i>
            </a>
          </Tooltip>
          <Tooltip title="中/英" color="transparent">
            <a>
              <i className="iconfont mr-duoyuyan login-icon"></i>
            </a>
          </Tooltip>
          <a>
            <i className="iconfont mr-lianxiwomen login-icon"></i>
          </a>

          <a>{/* <i className="iconfont mr-github login-icon"></i> */}</a>
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
          <a className="color-text-fff user-select">帮助</a>
          <a className="color-text-fff user-select">隐私</a>
          <a className="color-text-fff user-select">条款</a>
        </div>
        <MrFooter />
      </Footer>
    </div>
  );
}

export default Login;
