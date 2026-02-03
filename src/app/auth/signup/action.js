import API from "../../utils/api";

export const registerUser = async(data) => {
    const response  = await API.post('auth/register', data);
    return response;
}