import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE + '/api',
  withCredentials: true, // important to send cookies (HttpOnly token)
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
