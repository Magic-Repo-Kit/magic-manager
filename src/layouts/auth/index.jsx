import LoginForm from './loginForm';
import './index.scss';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

function Login() {
  return (
    <div className="login-container flx-center">
      <LoginForm />
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ top: 24, zIndex: 10 }}
      />
    </div>
  );
}

export default Login;
