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

interface BaseAgent {
    id: number;
    name: string;
    percentage: number; 
    parent_percentage: number; 
    role: string; 
    head_agent: number; 
    mid_agent: number; 
  }
  
  interface MiddleAgent {
    id: number;
    name: string;
    percentage: number; 
    parent_percentage: number; 
    role: string; 
    head_agent: number;
    baseAgents?: BaseAgent[]; 
  }
  
  export interface AgentData {
    id: number;
    name: string;
    percentage: number; 
    role: string; 
    middleAgents?: MiddleAgent[]; 
  }

  interface ReportDate {
    startDate : string;
    endDate: string;
  }

export const makeReport = async(formData:any,reportDate: ReportDate) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl2}/agents/report/`,{
        formData: formData,
        reportDate: reportDate,
    }, {
        headers : {
           'Authorization' : `Bearer ${accessToken}`
        }
        
    })

    return response

}

export const getAgentsJson = async() => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl2}/agents/display/`,{
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response
}

interface UpdateData {
    id: number;
    name: string;
    type: string;
    commission: number;
    parent?: number | null;
    parentId?: number | null;
  }


  export const makeUpdate = async(formData: UpdateData[]) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await axios.post(`${apiUrl2}/agents/update/`, {
            formData: formData  
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error; 
    }
};

  


export const deleteAgent = async(id:number, agentType: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl2}/agent/delete/`,{
        id:id,
        agentType:agentType

    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response

}


