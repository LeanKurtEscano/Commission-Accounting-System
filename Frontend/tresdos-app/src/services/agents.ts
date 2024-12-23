import axios from "axios";

const apiUrl2 = import.meta.env.VITE_API_URL2;
export const getAgents = async(agentType:string) => {
    console.log(agentType);
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl2}/agents/all/`,{
      agentType
    },{
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response
}

type UserProfile = {
    agentName: string;
    agentType: string;
    percentage: number;
    assignedHeadAgent?: number;
    assignedMiddleAgent?: number;
}


export const createAgents = async(formData : UserProfile) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl2}/agents/`,
        formData    
    ,{
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response
}
