import LoginForm from './loginForm';
import './index.less';
// import loginBcImg from '@/assets/images/login-bc.png';

function Login() {
  return (
    <div className="login-container flx-center">
      <div className="login-bc">
        {/* <img src={loginBcImg} alt="登录" /> */}
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
