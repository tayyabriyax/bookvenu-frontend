import API from "@/app/utils/api";

export const signin = async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};