"use client";


// --------------------
// ✅ Auth Storage
// --------------------
export const saveAuthData = (data) => {
  if (!data?.token || !data?.user) return false;

  const isProd = process.env.NODE_ENV === "production";

  document.cookie = `token=${data.token}; path=/; max-age=604800; ${
    isProd ? "secure;" : ""
  } samesite=strict`;

  localStorage.setItem("user", JSON.stringify(data.user));
  return true;
};

export const getUserFromStorage = () => {
  if (typeof window === "undefined") return null; // SSR safety

  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid user in localStorage", error);
    return null;
  }
};



