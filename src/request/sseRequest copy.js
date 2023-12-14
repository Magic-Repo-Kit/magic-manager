import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getNewToken } from "@/request/auth";
import { getAccessToken, getRefreshToken } from '@/utils/tools';

const token = getAccessToken();
const refreshToken = getRefreshToken();

// const abortController = new AbortController();
// const signal = abortController.signal;

function sseRequest(url, params, onMessage, onError) {

  let headers = {
    "Content-Type": "application/json",
    'Accept': '*/*',
    'User-Type': "pc",
    Authorization: `Bearer ${token}`
  };


  fetchEventSource(`/api${url}`, {
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
      console.log("🚀 ~ file: sseRequest.js:34 ~ onerror ~ error:", error)
      if (onError) {
        onError(error);
      }
      throw error;

    }
  });



  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }
  // //请求
  // const eventSource = fetchEventSource(url, {
  //   method: "POST",
  //   headers,
  // });
  // // 新消息
  // eventSource.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   if (onMessage) {
  //     onMessage(data);
  //   }
  // };
  // // 异常
  // eventSource.onerror = async (error) => {
  //   console.error("SSE Error:", error);
  //   if (onError) {
  //     onError(error);
  //   }

  //   if (error.status === 401 && refreshToken) {
  //     try {
  //       const newToken = await getNewToken(refreshToken);
  //       headers["Authorization"] = `Bearer ${newToken}`;

  //       // 关闭并重新创建 SSE 连接
  //       eventSource.close();
  //       createSSE(url, onMessage, onError, newToken, refreshToken);
  //     } catch (refreshError) {
  //       console.error("Refresh token failed:", refreshError);
  //     }
  //   }
  //   throw error;    //必须throw才能停止 
  // };

  // return {
  //   close: () => {
  //     eventSource.close();
  //   },

  //   send: (data) => {
  //     eventSource.send(JSON.stringify(data));
  //   },
  // };
}

export default sseRequest;
