// frontend/src/api.ts
import axios from "axios";

const API_BASE_URL =
   import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export interface Draft {
   id: number;
   country: string;
   region: string;
   city: string;
   inn: string;
   abbreviation: string;
   name: string;
   full_name: string;
   juridical_address: string;
   actual_address: string;
   phone: string;
   email: string;
   website: string;
   coworking_type: string;
   status: "pending" | "approved" | "rejected";
   created_at: string;
}

export const createDraft = async (
   draftData: Omit<Draft, "id" | "status" | "created_at">
) => {
   const response = await axios.post(`${API_BASE_URL}/drafts`, draftData);
   return response.data;
};

export const getDrafts = async (status?: string) => {
   const params = status ? { status } : {};
   const response = await axios.get(`${API_BASE_URL}/drafts`, { params });
   return response.data;
};

export const approveDraft = async (id: number) => {
   const response = await axios.put(`${API_BASE_URL}/drafts/${id}/approve`);
   return response.data;
};

export const rejectDraft = async (id: number) => {
   const response = await axios.put(`${API_BASE_URL}/drafts/${id}/reject`);
   return response.data;
};
