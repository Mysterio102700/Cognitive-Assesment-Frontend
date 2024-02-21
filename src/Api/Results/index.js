import { AxiosInstances } from "../../Utils/AxiosInstances";

export const getResults = async (data) => {
    const URL='/getResults'
    try {
        const response = await AxiosInstances.post(URL, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const postResults = async (data) =>{
    const URL="/postResult"
    try {
        const response = await AxiosInstances.post(URL,data)
    } catch (error) {
        console.log(error)
    }
}
