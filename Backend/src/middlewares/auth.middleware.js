// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    let token = req.cookies?.token;

    // Read from Authorization header if cookie is missing
    if (!token && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : req.headers.authorization;
    }

    if (!token) {
        return res.status(401).json({ message: "Token not provided." });
    }

    // Clean up any potential surrounding quotes or spaces
    token = token.trim().replace(/^["']|["']$/g, '');

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isTokenBlacklisted) {
        return res.status(401).json({ message: "token is invalid" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({
            message: "Invalid token.",
            error: err.message
        });
    }
}

module.exports = { authUser };