import axios from "axios";

export const API = import.meta.env.VITE_API_URL ||  "http://localhost:3001";

export const api = axios.create({
    baseURL: API, 
    headers: {"Content-Type": "application/json"},
});






