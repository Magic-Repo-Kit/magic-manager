import LoginForm from './loginForm';
import MrFooter from '@/components/mr-footer';
import './index.scss';
import mrkLogo from '@/assets/images/mrk-light.png';

import { Layout, theme } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function Login() {
  return (
    <div className="login-container flx-center">
      <LoginForm />
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
          <i className="iconfont mr-duoyuyan"></i>
          <i className="iconfont mr-day-moon"></i>
          <i className="iconfont mr-github"></i>
          <i className="iconfont mr-lianxiwomen"></i>
        </div>
      </Header>

      <Footer
        style={{ position: 'fixed', bottom: '0', background: 'transparent' }}
      >
        <div className="color-text-body text-center flx-justify-around">
          <a>帮助</a>
          <a>隐私</a>
          <a>条款</a>
        </div>
        <MrFooter />
      </Footer>
    </div>
  );
}

export default Login;
