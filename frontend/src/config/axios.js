import axios from 'axios';

export const axiosi = axios.create({
  baseURL: 'http://localhost:8000/', // Ensure this is pointing to your backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If you're handling cookies (JWT tokens)
});
