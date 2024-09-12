import { api } from "./api";

const LoginUserToken = async (email: string, password: string) => {
    try {
      const response = await api.post("/token/", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

export default LoginUserToken;