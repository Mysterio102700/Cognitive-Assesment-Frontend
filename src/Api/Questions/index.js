import { AxiosInstances } from "../../Utils/AxiosInstances";

export const getQuestionsData = async (que) => {
  const URL = "/questions";

  try {
    const response = await AxiosInstances.post(URL, que);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
