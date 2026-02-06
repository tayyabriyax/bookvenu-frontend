import API from "@/app/utils/api";

export const venueForOrganizer = async () => {
    const response = await API.get("/lawns/my");
    console.log("response =",response.data)
    return response.data;

};

export const venueForOrganizerById = async (id) => {
    const response = await API.get(`/lawns/my/${id}`);
    console.log("response =",response.data)
    return response.data;

};
