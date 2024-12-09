import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

const createUserAPI = async (email: string, password: string) => {
  try {
    const response = await callUserManagementAPI({
      method: 'post',
      url: '/create/',
      data: {
        email,
        password,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Throw error if the API call fails
  }
};

export default createUserAPI;