import { callUserManagementAPI } from './api';
import { AxiosResponse } from 'axios';

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
    // Return an error message
    return { message: 'Email verification failed.' };
  }
};