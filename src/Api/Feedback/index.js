import { AxiosInstances } from "../../Utils/AxiosInstances";

export const sendingFeedback = async (data) => {
  const URL = "/feedback";

  try {
    const response = await AxiosInstances.post(URL, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "An error occurred");
  }
};

export const getFeedbackData = async () => {
  const URL = "/getfeedbacks";

  try {
    const response = await AxiosInstances.get(URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "An error occurred");
  }
};
