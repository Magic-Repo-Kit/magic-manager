import { removeAccessToken, removeRefreshToken, } from '@/utils/tools';

export function logout() {
  // 清除token
  removeAccessToken();
  removeRefreshToken();
  // 清除用户信息

}
