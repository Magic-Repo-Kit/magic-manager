import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getNewToken } from '@/request/auth';
import { getAccessToken, getRefreshToken } from '@/utils/tools';

const token = getAccessToken()
const refreshToken = getRefreshToken()
// const abortController = new AbortController();
// const signal = abortController.signal;

function sseRequest(url, params, onMessage, onError) {

  let headers = {
    "Content-Type": "application/json",
    'Accept': '*/*',
    'User-Type': "pc",
    Authorization: `Bearer ${token}`
  };
  let eventSource = null;
  let isTokenRefreshing = false;

  const startSse = () => {
    eventSource = fetchEventSource(`/api${url}`, {
      method: "POST",
      // signal: signal,
      headers,
      body: JSON.stringify(params),
      openWhenHidden: true, //
      onmessage(event) {
        const data = JSON.parse(event.data);
        if (onMessage) {
          onMessage(data);
        }
      },
      onerror(error) {
        if (onError) {
          onError(error);
        }
        // throw error;
        // 如果token过期
        if (error.status === 401 && !isTokenRefreshing) {
          isTokenRefreshing = true;
          getNewToken(refreshToken).then((newToken) => {
            // 关闭之前的 SSE 连接
            if (eventSource) {
              eventSource.close();
            }

            // 更新token  重新请求
            headers.Authorization = `Bearer ${newToken}`;
            startSse();
          })
            .catch((err) => {
              console.error('Error:', err);
            })
            .finally(() => {
              isTokenRefreshing = false;
            });
        }

      }
    });
  }
  startSse();
  return eventSource;
}

export default sseRequest;
