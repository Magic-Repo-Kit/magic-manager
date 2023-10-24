import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://124.222.46.195:1000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-CN',
    'User-Type': 'pc'
  },
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers = Object.assign({
      Authorization: `Bearer ${accessToken}`
    }, config.headers);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response;
}, async error => {
  const originalRequest = error.config;
  // 如果token过期，此时401
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axiosInstance.post('/system/auth/refresh-token', { refreshToken });
      const newAccessToken = response.data.accessToken;
      // 将新的访问令牌存储在本地存储中
      localStorage.setItem('access_token', newAccessToken);
      // 更新请求头中的访问令牌
      originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
      // 重新发送原始请求
      return axiosInstance(originalRequest);
    } catch (error) {
      // 刷新失败，清除令牌并重定向到登录页面
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.replace('/auth');
    }
  }
  return Promise.reject(error);
});

// 将各种请求方法封装在 ajax 对象中
const ajax = {
  get: (url, params) => instance.get(url, { params }),
  post: (url, data) => instance.post(url, data),
  put: (url, data) => instance.put(url, data),
  delete: (url) => instance.delete(url),
}

export default ajax;
