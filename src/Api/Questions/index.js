import { AxiosInstances } from "../../Utils/AxiosInstances";

export const getQuestionsData = async (que) => {
  const URL = "/questions";

  try {
    const response = await AxiosInstances.post(URL, que);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async (data) => {
  const URL = "/getQuestions";

  try {
    const response = await AxiosInstances.post(URL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const insertQuestion = async (data) => {
  const URL = "/insertQuestion";

  try {
    const response = await AxiosInstances.post(URL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (data) => {
  const URL = "/updateQuestion";

  try {
    const response = await AxiosInstances.post(URL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (data) => {
  const URL = "/deleteQuestion";

  try {
    const response = await AxiosInstances.post(URL, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const questionGeneration = async (data) => {
  const URL = "/prompt";

  try {
    const response = await AxiosInstances.post(URL, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendGeneratedData = async (data) => {
  const URL = "/insertGeneratedData";

  try {
    const response = await AxiosInstances.post(URL, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
