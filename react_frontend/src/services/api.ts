import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an axios instance for the user management service
const userManagementApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // User Management API base URL
  timeout: 30000,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an axios instance for the data processing service
const dataProcessingApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8001/api', // Data Processing API base URL
  timeout: 30000,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false; // Flag to indicate if the token is being refreshed
let refreshSubscribers: (() => void)[] = []; // Array to hold subscribers waiting for token refresh

// Function to call all subscribers
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
};

// Function to add a subscriber to the array
const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

// Function to refresh the token
const refreshToken = async (): Promise<void> => {
  try {
    await userManagementApi.post('/token/refresh/', {}); // Make a request to refresh the token
    onRefreshed(); // Notify all subscribers
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Throw error if token refresh fails
  }
};

export const setupInterceptors = (setIsAuthenticated: (status: boolean) => void) => {
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

// Function to call the user management API with token refresh logic
const callUserManagementAPI = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response = await userManagementApi(config); // Make the API call
    return response; // Return the response
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Throw error if the API call fails
  }
};

// Function to call the data processing API
const callDataProcessingAPI = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response = await dataProcessingApi(config); // Make the API call
    return response; // Return the response
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Throw error if the API call fails
  }
};

export { userManagementApi, dataProcessingApi, callUserManagementAPI, callDataProcessingAPI };
