import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/tasks"; // Flask backend URL

export const getTasks = () => axios.get(API_BASE);
export const addTask = (title) => axios.post(API_BASE, { title });
export const updateTask = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_BASE}/${id}`);
