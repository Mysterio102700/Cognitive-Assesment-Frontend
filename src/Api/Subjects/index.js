import { AxiosInstances } from "../../Utils/AxiosInstances";

export const subjectData = async(data) =>{
    const URL='/subjects'

    try{
        const response = await AxiosInstances.post(URL,data)
        return response;
    } catch(error) {
        console.log(error)
    }
}


export const getSubjects = async(data) =>{
    const URL='/getSubjects'

    try{
        const response = await AxiosInstances.post(URL,data)
        return response;
    } catch(error) {
        console.log(error)
    }
}

export const insertSubject = async(data) =>{
    const URL='/addSubject'

    try{
        const response = await AxiosInstances.post(URL,data)
        return response;
    } catch(error) {
        console.log(error)
    }
}

export const updateSubject = async(data) =>{
    const URL='/updateSubject'

    try{
        const response = await AxiosInstances.post(URL,data)
        return response;
    } catch(error) {
        console.log(error)
    }
}

export const deleteSubject = async(data) =>{
    const URL='/deleteSubject'

    try{
        const response = await AxiosInstances.post(URL,data)
        return response;
    } catch(error) {
        console.log(error)
    }
}