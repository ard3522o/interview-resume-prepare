import axios from "axios";

// frontend auth API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true
});

// Render and Vercel are different sites. Do not rely solely on a cross-site
// cookie: browsers can block it. The API returns this token after login or
// registration, so send it with every protected auth request as well.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        });
        if (response.data.token) localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (err) {
        console.error("Register Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });
        if (response.data.token) localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function logout() {
    try {
        localStorage.removeItem("token");
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.error("Logout Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        console.error("GetMe Error:", err.response?.data || err.message);
        throw err;
    }
}
