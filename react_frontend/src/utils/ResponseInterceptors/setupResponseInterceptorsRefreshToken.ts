// Import necessary modules and functions
import axios, { AxiosResponse } from 'axios';
import { userManagementApi, dataProcessingApi } from '../../services/api'; // Import Axios instances from api.ts

// Flag to indicate if the token is being refreshed
let isRefreshing = false;

// Array to hold subscribers waiting for token refresh
let refreshSubscribers: (() => void)[] = [];

// Function to call all subscribers once the token is refreshed
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = []; // Clear subscribers after notifying them
};

// Function to add a subscriber to the array
const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

// Function to refresh the token
const refreshToken = async (): Promise<void> => {
  try {
    await userManagementApi.post('/refresh-token/', {}); // Make a request to refresh the token
    onRefreshed(); // Notify all subscribers
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Throw error if token refresh fails
  }
};

// Function to set up response interceptors for token refresh
export const setupResponseInterceptorsRefreshToken = (setIsAuthenticated: (status: boolean) => void) => {
  // Response interceptor to handle errors
  const responseInterceptor = async (error: any) => {
    const originalRequest = error.config;
    // Check if the error is a 401 Unauthorized and the request has not been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      // If not already refreshing the token
      if (!isRefreshing) {
        isRefreshing = true; // Set the refreshing flag
        try {
          await refreshToken(); // Attempt to refresh the token
          isRefreshing = false; // Reset the refreshing flag
          setIsAuthenticated(true); // Set isAuthenticated to true on successful token refresh
          console.log('Updated isAuthenticated status due to token refresh success:', true);
        } catch (refreshError) {
          isRefreshing = false; // Reset the refreshing flag
          console.error('Token refresh failed:', refreshError);
          setIsAuthenticated(false); // Set isAuthenticated to false on token refresh failure
          console.log('Updated isAuthenticated status due to token refresh fail:', false);
          return Promise.reject(refreshError); // Reject the promise with the refresh error
        }
      }

      // If already refreshing the token, add the original request to the subscribers
      const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
        addRefreshSubscriber(() => {
          resolve(axios(originalRequest)); // Retry the original request once the token is refreshed
        });
      });

      return retryOriginalRequest; // Return the promise to retry the original request
    }
    return Promise.reject(error); // Reject the promise with the original error if not a 401
  };

  // Attach the response interceptor to the Axios instances
  userManagementApi.interceptors.response.use((response) => response, responseInterceptor);
  dataProcessingApi.interceptors.response.use((response) => response, responseInterceptor);
};