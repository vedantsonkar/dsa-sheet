import axios from "axios";
import { TopicType, UserDataType } from "../types";

// Base API URL (replace with your backend's URL)
const API_BASE_URL = import.meta.env.VITE_API_URL; // Use Vite environment variables

// Types for requests and responses
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface MarkCompletePayload {
  topicId: string;
  subtopicId: number;
  isComplete: boolean;
}

// Helper to set up axios instance with Authorization token if available
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header if token exists in localStorage
const addAuthToken = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
  } else {
    delete api.defaults.headers["Authorization"]; // If no token, remove Authorization header
  }
};

// API functions
export const signup = async (
  payload: SignupPayload
): Promise<{ token: string }> => {
  const response = await api.post("/auth/signup", payload);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Store the token in localStorage
  }
  return response.data;
};

export const login = async (
  payload: LoginPayload
): Promise<{ token: string }> => {
  const response = await api.post("/auth/login", payload);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Store the token in localStorage
  }
  return response.data;
};

export const getTopics = async (): Promise<TopicType[]> => {
  addAuthToken(); // Ensure the token is included in the headers
  const response = await api.get("/topics");
  return response.data;
};

export const markTopicAsComplete = async (
  payload: MarkCompletePayload
): Promise<void> => {
  addAuthToken(); // Ensure the token is included in the headers
  const response = await api.post("/completed/mark", payload);
  return response.data;
};

export const getUserData = async (): Promise<UserDataType> => {
  addAuthToken(); // Ensure the token is included in the headers
  const response = await api.get("/auth/me");
  return response.data;
};
