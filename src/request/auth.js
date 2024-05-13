import ajax from '@/request';



// 账号密码登录
export const loginAPI = params => ajax.post('/system/auth/login', params);


// 获取第三方平台授权码 / 登录
export const getPlatformAuth = params => ajax.get('/system/auth/social-login-redirect', params);
export const platformLoginAPI = params => ajax.post('/system/auth/social-login', params);

// refreshToken刷新token
export const getNewToken = refreshToken => ajax.post(`/system/auth/refresh-token?refreshToken=${refreshToken}`)


// 注册
export const registerAPI = params => ajax.post('/system/auth/register', params);
// 忘记密码 
export const forgetPwdAPI = params => ajax.post('/system/auth/forget-password', params);

// 检查邮箱是否存在
export const checkEmailAPI = params => ajax.get('/system/auth/check-email', params);
// 检查账户是否存在
export const checkAccountAPI = params => ajax.post('/system/auth/check-account', params);
// 发送验证码
export const sendCodeAPI = (email, type) => ajax.post(`/system/auth/send-code?email=${email}&type=${type}`);
