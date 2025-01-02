// Import necessary modules and functions
import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

/**
 * Function to check if the user is authenticated by making a GET request to a protected endpoint.
 * 
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, and false otherwise.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const isAuthenticatedAPI = async (): Promise<boolean> => {
  try {
    // Make a request to a protected endpoint to check if the user is authenticated
    await callUserManagementAPI({
      method: 'get', // Use lowercase for the HTTP method
      url: '/status/',
    });
    return true; // Return true if the request is successful
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error checking authentication status:', error);
    return false; // Return false if the request fails
  }
};
