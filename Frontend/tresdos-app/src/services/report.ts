import axios from "axios";

const apiUrl2 = import.meta.env.VITE_API_URL2;


export const getReports  = async() => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl2}/reports/`, {
        headers: {

            'Authorization': `Bearer ${accessToken}`,
        }
    })


    return response
}

export const getReportDetails  = async(reportId: any) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl2}/report/${reportId}`, {
        headers: {

            'Authorization': `Bearer ${accessToken}`,
        }
    })


    return response
}