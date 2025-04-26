import axios from 'axios';
import { getAccessToken, setAuthCookies, clearAuthCookies } from './auth';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: baseURL,
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && !config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = (await cookies()).get('refreshToken')?.value;
        if (!refreshToken) throw new Error('No refresh token');
        
        const response = await api.post('/auth/refresh', {
          refreshToken
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        setAuthCookies(accessToken, newRefreshToken);
        
        subscribers.forEach(subscriber => subscriber(accessToken));
        subscribers = [];
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthCookies();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;