import API from "@/app/utils/api";

export const venueForOrganizer = async () => {
  const response = await API.get("/lawns/my");
  console.log("response =", response.data)
  return response.data;

};

export const venueForOrganizerById = async (id) => {
  const response = await API.get(`/lawns/my/${id}`);
  console.log("response =", response.data)
  return response.data;

};

export const venueForPublic = async (filters = {}) => {
  const response = await API.get("lawns/public", {
    params: {
      city: filters.city || "",
      search: filters.search || "",
    },
  });

  console.log("response =", response.data);
  return response.data;
};


export const addVenuebyOrganizer = async (data) => {
  const formData = new FormData();

  // basic fields
  formData.append("name", data.name);
  formData.append("venueType", data.venueType);
  formData.append("city", data.city);
  formData.append("address", data.address);
  formData.append("capacity", data.capacity);
  formData.append("description", data.description || "");
  if (Array.isArray(data.amenities)) {
    formData.append("amenities", data.amenities.join(","));
  }
  if (Array.isArray(data.perHeadPricing)) {
    formData.append(
      "perHeadPricing",
      JSON.stringify(data.perHeadPricing)
    );
  }

  console.log("Images =", data.images);


  data.images.forEach((file) => {
    formData.append("images", file);
  });

  const  response = await API.post("/lawns", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


  return response.data;
};
export const deleteVenuebyOrganizer = async (id) => {
  const response = await API.delete(`/lawns/my/${id}`);
  return response.data;
};

export const getBookingsforOrganizer = async () => {
  const response = await API.get(`bookings/owner`
  );
  console.log("response =", response.data)
  return response.data;
};

export const getBookingsforCustomer = async () => {
  const response = await API.get(`bookings/my`
  );
  console.log("response =", response.data)
  return response.data;
};

   