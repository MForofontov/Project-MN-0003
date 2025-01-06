import { callUserManagementAPI } from './api';
import { AxiosResponse, AxiosError } from 'axios';

interface VerifyEmailResponse {
  message: string;
}

export const verifyEmail = async (uidb64: string, token: string): Promise<VerifyEmailResponse> => {
  try {
    // Make a GET request to verify the email verification link
    const response: AxiosResponse<VerifyEmailResponse> = await callUserManagementAPI({
      method: 'get',
      url: '/verify-email/',
      params: {
        uidb64,
        token,
      },
    });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error verifying email:', error);
    // Assert that the error is an AxiosError
    if (error instanceof AxiosError) {
      // Check if the error response status is 400 and contains the specific message
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === 'Email verification link has expired.') {
          return { message: 'Email verification link has expired.' };
        }
        return error.response.data;
      }
    }
    // Return a generic error message for other statuses
    return { message: 'Email verification failed due to an unexpected error.' };
  }
};