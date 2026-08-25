import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        });
        return response.data;
    } catch (err) {
        // Log the actual backend error so you can see Zod validation issues
        console.error("Register Error:", err.response?.data || err.message);
        throw err; // Throw it so your React component knows it failed
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });
        return response.data;
    } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        throw err; 
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.error("Logout Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function getMe() {
    try {
        // ✅ FIXED: Changed axios.get to api.get
        const response = await api.get("/api/auth/get-me"); 
        return response.data;
    } catch (err) {
        console.error("GetMe Error:", err.response?.data || err.message);
        throw err;
    }
}