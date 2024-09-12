import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Your API base URL
  timeout: 30000,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async (): Promise<void> => {
  // Call the token refresh endpoint
  await api.post('token/refresh/', {});
};

// Function to call the API with token refresh logic
const callAPI = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response = await api(config);
    return response;
  } catch (error) {
    // Check if the error is a 401 Unauthorized error and attempt to refresh the token
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('401 Unauthorized Error:', error);
      try {
        await refreshToken();
        // Retry the original request with the new token
        const response = await api(config);
        return response;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export { api, callAPI }; ;