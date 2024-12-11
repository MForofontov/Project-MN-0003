import axios, { AxiosResponse } from 'axios';
import { userManagementApi, dataProcessingApi } from '../../services/api'; // Import Axios instances from api.ts

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
};

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

const refreshToken = async (): Promise<void> => {
  try {
    await userManagementApi.post('/token/refresh/', {});
    onRefreshed();
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const setupResponseInterceptorsRefreshToken = (setIsAuthenticated: (status: boolean) => void) => {
  const responseInterceptor = async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await refreshToken();
          isRefreshing = false;
          refreshSubscribers = [];
          setIsAuthenticated(true); // Set isAuthenticated to true on successful token refresh
          console.log('Updated isAuthenticated status due to token refresh success:', true);
        } catch (refreshError) {
          isRefreshing = false;
          console.error('Token refresh failed:', refreshError);
          setIsAuthenticated(false); // Set isAuthenticated to false on token refresh failure
          console.log('Updated isAuthenticated status due to token refresh fail:', false);
          return Promise.reject(refreshError);
        }
      }

      const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
        addRefreshSubscriber(() => {
          resolve(axios(originalRequest));
        });
      });

      return retryOriginalRequest;
    }
    return Promise.reject(error);
  };

  userManagementApi.interceptors.response.use((response) => response, responseInterceptor);
  dataProcessingApi.interceptors.response.use((response) => response, responseInterceptor);
};
