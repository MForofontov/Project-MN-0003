// Import necessary modules and functions
import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

// Import necessary types
import { AxiosResponse } from 'axios';

/**
 * Function to log in the user by making a POST request to the login endpoint.
 * 
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AxiosResponse<any>>} - A promise that resolves with the server response when the login is successful.
 * @throws {Error} - Throws an error if the API call fails.
 */
const loginUserToken = async (email: string, password: string): Promise<AxiosResponse<any>> => {
  try {
    // Make a POST request to the login endpoint
    const response = await callUserManagementAPI({
      method: 'post', // Use lowercase for the HTTP method
      url: '/login/',
      data: {
        email,
        password,
      },
    });

    // Return the response
    return response;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error logging in:', error);
    throw error; // Throw error if the API call fails
  }
};

// Export the loginUserToken function as the default export
export default loginUserToken;
