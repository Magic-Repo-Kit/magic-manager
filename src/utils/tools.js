/**
 * 设置accessToken
 * @param accessTokenn
 * @return
 */
export const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
}
/**
 * 获取accessToken
 * @return
 */
export const getAccessToken = () => localStorage.getItem('accessToken')
/**
 * 删除accessToken
 * @return
 */
export const removeAccessToken = () => localStorage.removeItem('accessToken');

/**
 * 设置refresh_token
 * @param refresh_token
 * @return
 */
export const setRefreshToken = (refresh_token) => {
  localStorage.setItem('refresh_token', refresh_token);
}
/**
 * 获取refresh_token
 * @return
 */
export const getRefreshToken = () => localStorage.getItem('refresh_token')
/**
 * 删除refresh_token
 * @return
 */
export const removeRefreshToken = () => localStorage.removeItem('refresh_token');


// 全屏/非全屏
export const handleFullScreenClick = () => {
  const element = document.documentElement;
  if (document.fullscreenElement) {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  } else {
    // 进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  }
};

