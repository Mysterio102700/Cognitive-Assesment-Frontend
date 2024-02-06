import { AxiosInstances } from "../../Utils/AxiosInstances";

export const subjectData = async(data) =>{
    const URL='/subjects'

    try{
        const response = await AxiosInstances.post(URL,data)
        console.log(response)
        return response;
    } catch(error) {
        console.log(error)
    }
}