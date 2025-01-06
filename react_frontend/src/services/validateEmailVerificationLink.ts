import { callUserManagementAPI } from './api';

export const validateEmailVerificationLink = async (uidb64: string, token: string): Promise<boolean> => {
  try {
    // Make a GET request to verify the email verification link
    const response = await callUserManagementAPI({
      method: 'get',
      url: '/validate-email-verification-link/',
      params: {
        uidb64,
        token,
      },
    });
    // If the request is successful and returns a 200 status code, return true
    return response.status === 200;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error validating email verification link:', error);
    // Return false if there is any error
    return false;
  }
};