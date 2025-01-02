// Import necessary modules and functions
import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

/**
 * Function to log out the user by making a POST request to the logout endpoint.
 * 
 * @param {string} token - The authentication token of the user.
 * @returns {Promise<void>} - A promise that resolves when the logout is successful.
 * @throws {Error} - Throws an error if the API call fails.
 */
const logOutAPI = async () => {
  try {
    // Make a POST request to the logout endpoint
    await callUserManagementAPI({
      method: 'post', // Use lowercase for the HTTP method
      url: '/logout/',
    });
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error logging out:', error);
    throw error; // Throw error if the API call fails
  }
};

// Export the logOutAPI function as the default export
export default logOutAPI;