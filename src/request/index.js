import React from 'react';
import axios from 'axios';
// import NProgress from "nprogress";  //进度条
// import "nprogress/nprogress.css";
import { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, removeRefreshToken, setRefreshToken } from "@/utils/tools";

// antd组件
import { message } from 'antd';


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

let reqPool = [] // 请求池,用于去掉重复的请求

// 请求拦截器
instance.interceptors.request.use((config) => {

  const access_token = getAccessToken();
  // 鉴权，判断本地有没有accessToken
  if (access_token) {
    config.headers = Object.assign({
      Authorization: `Bearer ${access_token}`
    }, config.headers);
  }

  // 保存第一次 post请求，剔除重复的 post 请求，防止重复数据提交
  if (/post/i.test(config.method)) {
    var url = config.baseURL + config.url
    if (reqPool.includes(url)) return Promise.reject(new Error('数据正在处理中...'))
    reqPool.push(url)
  }

  // NProgress.start();  //启动loading
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {

  // 剔除已完成的 post 请求
  let config = response.config
  if (/post/i.test(config.method)) {
    reqPool = reqPool.filter(url => url !== config.url)
  }


  // NProgress.done(); // 关闭loading
  return response;
}, async res => {
  console.log("🚀 ~ instance.interceptors.response.use ~ res:", res)
  // 剔除已完成的 post 请求
  let config = res.config
  if (/post/i.test(config.method)) {
    reqPool = reqPool.filter(url => url !== config.url)
  }

  const originalRequest = res.config;
  // 如果token过期，此时401 
  if (res.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = getRefreshToken();
      const response = await instance.post(`/system/auth/refresh-token?refreshToken=${refreshToken}`);

      if (response.data.code === 200) {
        const newAccessToken = response.data.data.access_token;
        const newRefreshToken = response.data.data.refresh_token;
        // 本地更新token
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        // 更新请求头中的访问令牌
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 重新发送原始请求
        return instance(originalRequest);
      } else {
        // 其他状态码 抛出错误
        throw new Error(response.data.msg);
      }

    } catch (error) {
      console.log('error', error);
      message.error('身份认证过期，请重新登录');
      // 刷新失败，清除token 重新登录【清除本地缓存帐号信息user-detail】
      removeAccessToken('access_token');
      removeRefreshToken('refresh_token');
      setTimeout(() => {
        window.location.replace('/auth');
      }, 1000); // 设置延迟时间为1秒（1000毫秒）
    }
  }
  return Promise.reject(res);
});


// 将各种请求方法封装在 ajax 对象中，并且解构
const ajax = {
  get: (url, params) => instance.get(url, { params }).then(res => res.data),
  post: (url, data) => instance.post(url, data).then(res => res.data),
  put: (url, data) => instance.put(url, data).then(res => res.data),
  delete: (url) => instance.delete(url).then(res => res.data),
}

export default ajax;
