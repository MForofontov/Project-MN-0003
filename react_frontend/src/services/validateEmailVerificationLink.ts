// Import necessary modules and functions
import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

/**
 * Function to validate an email verification link by making a GET request to the validate-email-verification-link endpoint.
 * 
 * @param {string} token - The email verification token.
 * @returns {Promise<void>} - A promise that resolves when the email verification is successful.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const validateEmailVerificationLink = async (uidb64:string, token: string) => {
  try {
    // Make a GET request to verify the email verification link
    await callUserManagementAPI({
      method: 'get', // Use lowercase for the HTTP method
      url: '/validate-email-verification-link/',
      params: {
        uidb64,
        token,
      },
    });
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error validating email verification link:', error);
    throw error; // Throw error if the API call fails
  }
};
