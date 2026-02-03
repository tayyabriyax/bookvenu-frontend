import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let activeRequests = 0;

const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API,
baseURL:"https://bookvenu.up.railway.app/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ---------- REQUEST ---------- */
API.interceptors.request.use(
  (config) => {
    if (activeRequests === 0) {
      NProgress.start();
    }
    activeRequests++;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* ---------- RESPONSE ---------- */
API.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return Promise.reject(error);
  }
);

export default API;
