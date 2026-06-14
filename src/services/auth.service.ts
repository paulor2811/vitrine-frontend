import { api } from './api.service';
import config from './config.service';
import type { IApiResponse, IUser } from '@/types';

interface ILoginResponse {
  token: string;
  user: IUser;
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<IApiResponse<ILoginResponse>>('/auth/login', { email, password }),

  me: () =>
    api.get<IApiResponse<IUser>>('/auth/me', true),

  logout: () =>
    api.post<IApiResponse<null>>('/auth/logout', {}, true),

  googleRedirectUrl: () =>
    `${config.apiUrl}/auth/google/redirect`,
};
