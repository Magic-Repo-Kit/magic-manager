
/**
 * 设置accessToken
 * @param access_token
 * @return
 */
export const setAccessToken = (access_token) => {
  localStorage.setItem('access_token', access_token);
}
/**
 * 获取accessToken
 * @return
 */
export const getAccessToken = () => localStorage.getItem('access_token')
/**
 * 删除accessToken
 * @return
 */
export const removeAccessToken = () => localStorage.removeItem('access_token');

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

// 生成随机数
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 校验输入:字母 数字 _ - . @  12位
export const filterInput = (e, setValue) => {
  const inputValue = e.target.value;
  const filteredValue = inputValue.replace(/[^a-zA-Z0-9_\-.@]/g, '');
  const maxLengthValue = filteredValue.match(/^.{0,12}/)[0]; // 最多匹配前12个字符
  setValue(maxLengthValue);
};


