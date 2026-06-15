import { api } from './api.service';
import config from './config.service';
import type { IApiResponse, IUser } from '@/types';

interface ILoginResponse {
  user: IUser;
  expires_in: number;
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<IApiResponse<ILoginResponse>>('/auth/login', { email, password }),

  me: () =>
    api.get<IApiResponse<IUser>>('/auth/me'),

  logout: () =>
    api.post<IApiResponse<null>>('/auth/logout', {}),

  googleRedirectUrl: () =>
    `${config.apiUrl}/auth/google/redirect`,

  setPassword: (data: { password: string; password_confirmation: string; current_password?: string }) =>
    api.post<IApiResponse<null>>('/auth/password', data),
};
