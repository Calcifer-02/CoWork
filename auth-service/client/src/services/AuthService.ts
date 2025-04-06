import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
// Объявляем кастомный тип для ответа API
type ApiResponse<T> = {
   data: T;
   status: number;
   statusText: string;
};

export default class AuthService {
   static async login(email: string, password: string): Promise<AuthResponse> {
      // Возвращаем AuthResponse напрямую, без поля data
      const response = await $api.post<AuthResponse>("/login", {
         email,
         password,
      });
      return response.data; // Просто возвращаем данные ответа
   }

   static async registration(
      email: string,
      password: string
   ): Promise<ApiResponse<AuthResponse>> {
      const response = await $api.post<AuthResponse>("/registration", {
         email,
         password,
      });
      return {
         data: response.data,
         status: response.status,
         statusText: response.statusText,
      };
   }

   static async logout(): Promise<void> {
      await $api.post("/logout");
   }

   static async refresh(): Promise<AuthResponse> {
      try {
         const response = await $api.get<AuthResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });
         return response.data;
      } catch (error) {
         console.error("Refresh request failed:", error);
         throw error;
      }
   }
}
