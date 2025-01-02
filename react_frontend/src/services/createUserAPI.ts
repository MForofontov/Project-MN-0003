// Import necessary modules and functions
import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

/**
 * Function to create a new user by making a POST request to the user creation endpoint.
 * 
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<any>} - A promise that resolves with the server response when the user creation is successful.
 * @throws {Error} - Throws an error if the API call fails.
 */
const createUserAPI = async (email: string, password: string): Promise<any> => {
  try {
    // Make a POST request to the user creation endpoint
    const response = await callUserManagementAPI({
      method: 'post', // Use lowercase for the HTTP method
      url: '/create/',
      data: {
        email,
        password,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error creating user:', error);
    throw error; // Throw error if the API call fails
  }
};

// Export the createUserAPI function as the default export
export default createUserAPI;