import { callUserManagementAPI } from './api'; // Import the callUserManagementAPI function

const logOutAPI = async () => {
  try {
    await callUserManagementAPI({
      method: 'post', // Use lowercase for the HTTP method
      url: '/logout/',
    });
  } catch (error) {
    console.error('Error logging out:', error);
    throw error; // Throw error if the API call fails
  }
};

export default logOutAPI;