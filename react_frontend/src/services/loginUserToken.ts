import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

const loginUserToken = async (email: string, password: string) => {
  try {
    const response = await callUserManagementAPI({
      method: 'post',
      url: '/token/obtain',
      data: {
        email,
        password,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Throw error if the API call fails
  }
};

export default loginUserToken;