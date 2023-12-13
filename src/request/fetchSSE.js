import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getNewToken } from "@/request/auth";


function createSSE(url, onMessage, onError, token, refreshToken) {
  let headers = {
    "Content-Type": "application/json",
    'User-Type': "pc"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  //请求
  const eventSource = fetchEventSource(url, {
    method: "POST",
    headers,
  });
  // 新消息
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (onMessage) {
      onMessage(data);
    }
  };
  // 异常
  eventSource.onerror = async (error) => {
    console.error("SSE Error:", error);
    if (onError) {
      onError(error);
    }

    if (error.status === 401 && refreshToken) {
      try {
        const newToken = await getNewToken(refreshToken);
        headers["Authorization"] = `Bearer ${newToken}`;

        // 关闭并重新创建 SSE 连接
        eventSource.close();
        createSSE(url, onMessage, onError, newToken, refreshToken);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }
  };

  return {
    close: () => {
      eventSource.close();
    },

    send: (data) => {
      eventSource.send(JSON.stringify(data));
    },
  };
}

export default createSSE;
