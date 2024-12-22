import axios from "axios";
import { FormData } from "../types/form";

const api = axios.create({
  baseURL: "https://example.com", // Replace with your API base URL
});

export const submitFormData = (data: FormData) => api.post("/api/submit", data);
