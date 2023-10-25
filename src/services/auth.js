import ajax from '@/utils/request';

export const loginAPI = params => ajax.post('/system/auth/login', params);
