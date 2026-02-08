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
  try {
    const formData = new FormData();

    // Required fields
    formData.append("name", data.name);
    formData.append("venueType", data.venueType);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("capacity", data.capacity);
    formData.append("description", data.description || "");

    // Amenities as CSV string
    if (data.amenities) {
      formData.append("amenities", Array.isArray(data.amenities) ? data.amenities.join(",") : data.amenities);
    }

    // Per head pricing as JSON string
    if (data.perHeadPricing) {
      formData.append("perHeadPricing", JSON.stringify(data.perHeadPricing));
    }

    // Images — **repeatable field**
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file); // append each file individually
      });
    } else {
      throw new Error("At least one image is required");
    }

    // Send request
    const response = await API.post("lawns", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Venue added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding venue:", error.response?.data || error.message);
    throw error;
  }
};
