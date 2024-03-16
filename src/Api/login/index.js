import { AxiosInstances } from "../../Utils/AxiosInstances";

export const login = async (user) => {
  const URL = "/login";

  try {
    const response = await AxiosInstances.post(URL, user);
    return response;
  } catch (error) {
    console.log();
    return error.response.data;
  }
};

export const register = async (user) => {
  const URL = "/register";

  try {
    const response = await AxiosInstances.post(URL, user);
    return response;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};
