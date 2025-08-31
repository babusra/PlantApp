import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummy-api-jtg6bessta-ey.a.run.app",
  timeout: 15000,
});


api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.log("[API][ERR] name:", e.name, "message:", e.message);
    console.log("[API][ERR] config:", e.config?.baseURL+e.config?.url);
    console.log("[API][ERR] code:", e.code); // ERR_NETWORK vs
    console.log("[API][ERR] response:", e.response?.status); // yoksa gerçekten network
    throw e;
  }
);