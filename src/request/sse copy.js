import { useRef, useState, useEffect } from 'react';

import { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, removeRefreshToken } from "@/utils/tools";
import ajax from "./index";

const useSSE = (url, onMessage, onError) => {
  const [data, setData] = useState('');
  const eventSource = useRef(null);

  useEffect(() => {
    // token
    let access_token = getAccessToken();

    // headers
    const headers = new Headers();
    headers.append('User-Type', 'pc');
    if (access_token) {
      headers.append('Authorization', `Bearer ${access_token}`);
    }


    eventSource.current = new EventSource(url, { headers });

    eventSource.current.onopen = () => {
      // 连接建立时的操作（可选）
    };

    // 收到新消息时触发的回调函数
    eventSource.current.onmessage = (event) => {
      onMessage(event.data);
      setData(event.data);
    };

    // 请求失败
    eventSource.current.onerror = async (error) => {
      if (error.status === 403) { //未授权

        let refreshToken = getRefreshToken();
        try {
          // 请求刷新token
          const res = await ajax.post('/system/auth/refresh-token', { refreshToken });
          const newAccessToken = res.access_token
          // 更新存储token
          setAccessToken(newAccessToken);
          // 更新 SSE 连接的 headers
          headers.set('Authorization', `Bearer ${newAccessToken}`);
          // 关闭旧的 SSE 连接
          eventSource.current.close();
          // 创建新的 SSE 连接
          eventSource.current = new EventSource(url, { headers });

        } catch (error) {
          // 处理请求出错的情况
          console.error(error);
          removeAccessToken('access_token');
          removeRefreshToken('refresh_token');
          window.location.href('/auth');
        }
      }

      onError(error);
    };

    return () => {
      if (eventSource.current) {
        eventSource.current.close();
      }
    };
  }, [url, onMessage, onError]);

  return data;
};

export default useSSE;
