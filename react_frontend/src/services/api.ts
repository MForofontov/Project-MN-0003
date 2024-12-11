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