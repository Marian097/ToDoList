import axios from "axios";

//export const API = import.meta.env.VITE_API_URL ||  "http://localhost:3001";

export const api = axios.create({
    baseURL: "https://todolist-zuml.onrender.com", 
    headers: {"Content-Type": "application/json"},
});






