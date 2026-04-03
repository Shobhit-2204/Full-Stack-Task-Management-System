import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Tokens {
  accessToken: string | null;
}

// Create axios instance with credentials
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies to be sent with requests
});

// Token management - only accessToken in storage, refreshToken in HttpOnly cookie
export const getTokens = (): Tokens => {
  if (typeof window === 'undefined') return { accessToken: null };
  
  return {
    accessToken: localStorage.getItem('accessToken'),
  };
};

export const setTokens = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  // refreshToken is automatically handled as HttpOnly cookie by the server
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  // HttpOnly cookie is automatically cleared by the server on logout
};

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const { accessToken } = getTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor with token refresh logic
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });
  
  isRefreshing = false;
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // No need to pass refreshToken - it's in the HttpOnly cookie
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true, // Enable cookies
        });

        const { accessToken: newAccessToken } = response.data;
        setTokens(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
