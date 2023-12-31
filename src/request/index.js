import axios from 'axios';
// import NProgress from "nprogress";  //进度条
// import "nprogress/nprogress.css";

import { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, removeRefreshToken } from "@/utils/tools";
// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://124.222.46.195',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-CN',
    'User-Type': 'pc'
  },
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  const access_token = getAccessToken();
  // 鉴权，判断本地有没有accessToken
  if (access_token) {
    config.headers = Object.assign({
      Authorization: `Bearer ${access_token}`
    }, config.headers);
  }
  // NProgress.start();  //启动loading
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  // NProgress.done(); // 关闭loading
  return response;
}, async error => {
  const originalRequest = error.config;
  // 如果token过期，此时401 
  if (error.response.code === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = getRefreshToken();
      const response = await instance.post('/system/auth/refresh-token', { refreshToken });
      if (response.code === 200) {
        const newAccessToken = response.data.access_token;
        // 将新的访问令牌存储在本地存储中
        setAccessToken(newAccessToken);
        // 更新请求头中的访问令牌
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 重新发送原始请求
        return instance(originalRequest);
      } else {
        removeAccessToken('access_token');
        removeRefreshToken('refresh_token');
        window.location.href('/auth');
      }

    } catch (error) {
      // 刷新失败，清除令牌并重定向到登录页面【清除token，清除本地缓存帐号信息user-detail】
      removeAccessToken('access_token');
      removeRefreshToken('refresh_token');
      window.location.href('/auth');
      // window.location.replace('/auth');
    }
  }
  return Promise.reject(error);
});

// 将各种请求方法封装在 ajax 对象中，并且解构
const ajax = {
  get: (url, params) => instance.get(url, { params }).then(res => res.data),
  post: (url, data) => instance.post(url, data).then(res => res.data),
  put: (url, data) => instance.put(url, data).then(res => res.data),
  delete: (url) => instance.delete(url).then(res => res.data),
}

export default ajax;
