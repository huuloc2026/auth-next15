import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constant';
import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  return  (await cookies()).get(ACCESS_TOKEN)?.value;
};

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
  (await cookies()).set(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 15,
    path: '/',
  });

  (await cookies()).set(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  });
};

export const clearAuthCookies = async () => {
  (await cookies()).delete(ACCESS_TOKEN);
  (await cookies()).delete(REFRESH_TOKEN);
};