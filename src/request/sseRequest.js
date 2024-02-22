import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/tools';
import { message } from 'antd';
import { getNewToken } from "./auth.js";

function sseRequest(url, params, onMessage, setIsLoading, onMyError) {

  let eventSource = null;
  const ctrl = new AbortController();

  // 开发环境
  const devUrl = `/api${url}`;
  // 生产环境
  const prodUrl = `https://60.204.200.62${url}`;
  const apiUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;

  const startSse = () => {
    eventSource = fetchEventSource(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': '*/*',
        'User-Type': "pc",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(params),
      signal: ctrl.signal,
      openWhenHidden: true, //解决:当发送请求且暂未触发 onopen 事件前，离开当前窗口时会自动被取消

      async onopen(response) {
        if (response.ok && response.status === 200) {
          console.log('连接成功')
          // 此处response 里面返回的code可能等于500
          return
        } else if (response.status === 401) {
          console.log('token过期')


          let res = await getNewToken(getRefreshToken())
          if (res.code === 200) {
            // token刷新成功
            const newAccessToken = res.data.access_token;
            const newRefreshToken = res.data.refresh_token;
            // 本地更新token
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            // setIsLoading(true) //重新等待
            // startSse(); //重新请求
            setTimeout(() => {
              setIsLoading(true); // 重新设置等待状态
              startSse(); //重新请求
            }, 0);
          } else {
            console.log('token更新失败')
            message.error('身份认证过期，请重新登录');
            setTimeout(() => {
              window.location.replace('/auth');
              sessionStorage.clear();
            }, 1000);
          }

        } else {
          console.log('连接异常')
          message.error(response.error || '连接异常');
          onMyError(response) //手动抛出一个错误
        }
      },
      onmessage(event) {
        // console.log("🚀 ~ onmessage ~ event:", event)
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          data.forEach(messageData => {
            if (onMessage) {
              onMessage(messageData);
            }
          });
        } else {
          if (onMessage) {
            onMessage(data);
          }
        }


      },

      onerror(error) {
        // 关闭 SSE 连接
        // eventSource.close();
        console.log(error || '连接错误');
        message.error(error || '连接错误');
        throw error
      },
      onclose() {
        setIsLoading(false);
        console.log('关闭连接');
      },
    });
  }
  startSse()


  return eventSource;
}

export default sseRequest;


// 连接一旦建立，就会触发open事件，可以在onopen属性定义回调函数
// 客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性的回调函数。
// 如果发生通信错误（比如连接中断），就会触发error事件，可以在onerror属性定义回调函数。
// close方法用于关闭 SSE 连接。
