import {api} from './api';

const CreateUserAPI = async (email: string, password: string) => {
    try {
      const response = await api.post('/create/', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  export default CreateUserAPI