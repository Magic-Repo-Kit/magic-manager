import LoginForm from './loginForm';
import MrFooter from '@/components/mr-footer';
import './index.scss';
import mrkLogo from '@/assets/images/mrk5.png';

import { Layout, theme } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function Login() {
  return (
    <div className="login-container flx-center">
      <LoginForm />

      <img
        src={mrkLogo}
        alt=""
        height="20"
        style={{ position: 'fixed', left: '12px', top: '12px' }}
      />

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
