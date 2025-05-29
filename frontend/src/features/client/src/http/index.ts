import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
   withCredentials: true,
   baseURL: API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

$api.interceptors.request.use((config) => {
   if (config.headers) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
   }
   return config;
});

$api.interceptors.response.use(
   (config) => config,
   async (error) => {
      const originalRequest = error.config;
      if (
         error.response?.status === 401 &&
         error.config &&
         !originalRequest._isRetry
      ) {
         originalRequest._isRetry = true;
         try {
            const response = await axios.get<AuthResponse>(
               `${API_URL}/refresh`,
               {
                  withCredentials: true,
               }
            );
            localStorage.setItem("token", response.data.accessToken);
            return $api.request(originalRequest);
         } catch (e) {
            console.log("Не авторизован");
            await AuthService.logout();
            window.location.reload();
         }
      }
      throw error;
   }
);

export default $api;
