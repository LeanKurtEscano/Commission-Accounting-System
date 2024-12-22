import axios from "axios";

export const logOut  = async(url:string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${url}/logout/`,{}, {
        headers: {

            'Authorization': `Bearer ${accessToken}`,
        }
    })


    return response
}

export const handleLogin =  async(username:string , password: string, url: string) => {
    const response = await axios.post(`${url}/login/`,{
        username: username,
        password : password
        }, {
            headers:{
                 "Content-Type": "application/json"
            }       
        }
    )

    return response
}

