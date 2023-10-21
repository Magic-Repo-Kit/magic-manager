import LoginForm from './loginForm';
import './index.scss';
// import loginBcImg from '@/assets/images/login-bc.png';

function Login() {
  return (
    <div className="logindcontainer flxdcenter">
      <div className="login-bc">{/* <img src={loginBcImg} alt="ß" /> */}</div>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
