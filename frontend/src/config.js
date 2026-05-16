// This config file handles the backend URL for both local development and production deployment.
// When you deploy your backend (e.g., to Render), you can add your Render URL here.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
