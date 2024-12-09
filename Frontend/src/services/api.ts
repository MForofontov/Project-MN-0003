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

// Add a response interceptor to handle token expiration for user management API
userManagementApi.interceptors.response.use(
  (response) => response, // Return the response if no error
  async (error) => {
    const originalRequest = error.config; // Get the original request
    if (error.response.status === 401 && !originalRequest._retry) { // Check if the error is due to an expired token
      if (!isRefreshing) { // If not already refreshing the token
        isRefreshing = true; // Set the flag to indicate token refresh is in progress
        try {
          await refreshToken(); // Refresh the token
          isRefreshing = false; // Reset the flag
          refreshSubscribers = []; // Clear the subscribers array
        } catch (refreshError) {
          isRefreshing = false; // Reset the flag if token refresh fails
          console.error('Token refresh failed:', refreshError);
          // Optionally, handle logout or redirect to login page
          return Promise.reject(refreshError); // Reject the promise with the refresh error
        }
      }

      // Create a promise to retry the original request
      const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
        addRefreshSubscriber(() => {
          resolve(userManagementApi(originalRequest)); // Retry the original request once the token is refreshed
        });
      });

      return retryOriginalRequest; // Return the promise to retry the original request
    }
    return Promise.reject(error); // Reject the promise with the original error
  }
);

// Add a response interceptor to handle token expiration for data processing API
dataProcessingApi.interceptors.response.use(
  (response) => response, // Return the response if no error
  async (error) => {
    const originalRequest = error.config; // Get the original request
    if (error.response.status === 401 && !originalRequest._retry) { // Check if the error is due to an expired token
      if (!isRefreshing) { // If not already refreshing the token
        isRefreshing = true; // Set the flag to indicate token refresh is in progress
        try {
          await refreshToken(); // Refresh the token
          isRefreshing = false; // Reset the flag
          refreshSubscribers = []; // Clear the subscribers array
        } catch (refreshError) {
          isRefreshing = false; // Reset the flag if token refresh fails
          console.error('Token refresh failed:', refreshError);
          // Optionally, handle logout or redirect to login page
          return Promise.reject(refreshError); // Reject the promise with the refresh error
        }
      }

      // Create a promise to retry the original request
      const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
        addRefreshSubscriber(() => {
          resolve(dataProcessingApi(originalRequest)); // Retry the original request once the token is refreshed
        });
      });

      return retryOriginalRequest; // Return the promise to retry the original request
    }
    return Promise.reject(error); // Reject the promise with the original error
  }
);

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
