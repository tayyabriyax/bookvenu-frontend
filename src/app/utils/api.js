


import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Cookies from "js-cookie"; // ✅ import js-cookie to read cookies

// Track active requests and progress
let activeRequests = 0;
let progress = 0;
let intervalId = null;

// Create Axios instance
const API = axios.create({
  baseURL: "https://bookvenu.up.railway.app/api/v1/",
  // baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true, // send cookies automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ---------- REQUEST INTERCEPTOR ---------- */
API.interceptors.request.use((config) => {
  activeRequests++;

  // Start NProgress if this is the first request
  if (activeRequests === 1) {
    NProgress.start();

    // Ensure .spinner exists
    let spinnerContainer = document.querySelector(".spinner");
    if (!spinnerContainer) {
      spinnerContainer = document.createElement("div");
      spinnerContainer.className = "spinner fixed top-4 left-4 z-50";
      document.body.appendChild(spinnerContainer);
    }

    // Create percent element if not exists
    let percentEl = document.querySelector(".spinner-percent");
    if (!percentEl) {
      percentEl = document.createElement("span");
      percentEl.className = "spinner-percent";
      percentEl.innerText = "0%";
      spinnerContainer.appendChild(percentEl);
    }

    progress = 0;

    // Increment percentage gradually
    intervalId = setInterval(() => {
      const el = document.querySelector(".spinner-percent");
      if (!el) return; // safety check
      if (progress < 95) {
        progress += Math.random() * 5; // simulate progress
        el.innerText = Math.floor(progress) + "%";
      } else {
        clearInterval(intervalId);
      }
    }, 200);
  }

  // ✅ Attach Bearer token from cookies
  const token = Cookies.get("token"); // token is the cookie name
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------- RESPONSE INTERCEPTOR ---------- */
API.interceptors.response.use(
  (response) => {
    activeRequests--;

    // If all requests finished
    if (activeRequests === 0) {
      const el = document.querySelector(".spinner-percent");
      if (el) el.innerText = "100%";

      clearInterval(intervalId);
      setTimeout(() => NProgress.done(), 200); // small delay to show 100%
    }

    return response;
  },
  (error) => {
    activeRequests--;

    if (activeRequests === 0) {
      const el = document.querySelector(".spinner-percent");
      if (el) el.innerText = "100%";

      clearInterval(intervalId);
      setTimeout(() => NProgress.done(), 200);
    }

    return Promise.reject(error);
  }
);

export default API;
