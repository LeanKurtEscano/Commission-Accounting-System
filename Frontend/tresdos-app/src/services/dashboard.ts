
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL3;
export const getTotalSum = async(endpoint:string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/${endpoint}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response
}

export const getWeekly = async(month:string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl}/monthly/`,{
        selectedMonth: month
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response
}








