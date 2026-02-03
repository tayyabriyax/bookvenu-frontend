import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let activeRequests = 0;
let progress = 0;

const API = axios.create({
  baseURL: "https://bookvenu.up.railway.app/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ---------- REQUEST ---------- */
API.interceptors.request.use((config) => {
  if (activeRequests === 0) {
    NProgress.start();

    // Add percent text element if not exists
    if (!document.querySelector(".spinner-percent")) {
      const percentText = document.createElement("span");
      percentText.className = "spinner-percent";
      percentText.innerText = "0%";
      document.querySelector(".spinner").appendChild(percentText);
    }

    progress = 0;
    const interval = setInterval(() => {
      if (progress < 95) {
        progress += Math.random() * 5; // simulate progress
        document.querySelector(".spinner-percent").innerText =
          Math.floor(progress) + "%";
      } else {
        clearInterval(interval);
      }
    }, 200);
  }
  activeRequests++;
  return config;
});

/* ---------- RESPONSE ---------- */
API.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      document.querySelector(".spinner-percent").innerText = "100%";
      setTimeout(() => NProgress.done(), 200); // small delay to show 100%
    }
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) NProgress.done();
    return Promise.reject(error);
  }
);

export default API;
