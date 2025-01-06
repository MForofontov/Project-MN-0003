import { callUserManagementAPI } from './api';
import { AxiosResponse } from 'axios';

interface ResendEmailVerificationResponse {
  message: string;
}

export const resendEmailVerification = async (uidb64: string): Promise<ResendEmailVerificationResponse> => {
  try {
    // Make a GET request to resend the verification email
    const response: AxiosResponse<ResendEmailVerificationResponse> = await callUserManagementAPI({
      method: 'get',
      url: '/resend-verification-email/',
      params: {
        uidb64,
      },
    });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error resending verification email:', error);
    // Return an error message
    return { message: 'Failed to resend verification email.' };
  }
};
