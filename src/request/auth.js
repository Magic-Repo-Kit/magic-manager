import ajax from '@/request';



// 账号密码登录
export const loginAPI = params => ajax.post('/system/auth/login', params);


// 获取第三方平台授权码 / 登录
export const getPlatformAuth = params => ajax.get('/system/auth/social-login-redirect', params);
export const platformLoginAPI = params => ajax.post('/system/auth/social-login', params);

// refreshToken刷新token
export const getNewToken = refreshToken => ajax.post(`/system/auth/refresh-token?refreshToken=${refreshToken}`)
