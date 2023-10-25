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
