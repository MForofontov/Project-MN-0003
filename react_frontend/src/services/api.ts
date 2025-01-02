// Import necessary modules and functions
import axios, { AxiosInstance } from 'axios';

// Create an Axios instance for user management API
export const userManagementApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL for the user management API
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Create an Axios instance for data processing API
export const dataProcessingApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/data', // Base URL for the data processing API
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

/**
 * Function to make API calls to the user management API.
 * 
 * @param {object} config - The Axios request configuration object.
 * @returns {Promise<any>} - A promise that resolves with the server response.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const callUserManagementAPI = async (config: object): Promise<any> => {
  try {
    const response = await userManagementApi(config); // Make the API call using the user management Axios instance
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error calling user management API:', error); // Log any errors that occur
    throw error; // Throw error if the API call fails
  }
};

/**
 * Function to make API calls to the data processing API.
 * 
 * @param {object} config - The Axios request configuration object.
 * @returns {Promise<any>} - A promise that resolves with the server response.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const callDataProcessingAPI = async (config: object): Promise<any> => {
  try {
    const response = await dataProcessingApi(config); // Make the API call using the data processing Axios instance
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error calling data processing API:', error); // Log any errors that occur
    throw error; // Throw error if the API call fails
  }
};
