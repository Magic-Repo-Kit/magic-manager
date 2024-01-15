import { removeAccessToken, removeRefreshToken, } from '@/utils/tools';

export function logout() {
  // 清除token
  removeAccessToken();
  removeRefreshToken();
  // 清除sessionStorage
  sessionStorage.clear();
  // 清除用户信息

  // 非必要不relace到auth，避免额外渲染
}
