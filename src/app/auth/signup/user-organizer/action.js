import API from "@utils/api";


export const getRecord= async()=>{
    const response = await API.get(`auth/health-check`);
    console.log(response.data);
    return response.data;
    
}