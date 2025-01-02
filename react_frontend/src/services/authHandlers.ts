import loginUserToken from './loginUserToken';
import createUserAPI from './createUserAPI';

export const handleLoginUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: (path: string) => void
) => {
  event.preventDefault();
  try {
    await loginUserToken(email, password);
    // Handle successful user login (e.g., redirect, show message)
    navigate('/dashboard');
  } catch (error) {
    console.error('Error logging in user:', error);
    // Handle error (e.g., show error message)
  }
};

export const handleRegisterUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: (path: string) => void
) => {
  event.preventDefault();
  try {
    await createUserAPI(email, password);
    // Handle successful user creation (e.g., redirect, show message)
    navigate('/dashboard');
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle error (e.g., show error message)
  }
};