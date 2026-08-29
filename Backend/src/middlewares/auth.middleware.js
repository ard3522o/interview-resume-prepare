// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    // Prefer the explicitly supplied bearer token. On a Vercel -> Render
    // deployment, an old third-party cookie can still be sent by the browser;
    // it must not override the current token stored by the frontend.
    const authorization = req.headers.authorization;
    let token;

    if (authorization) {
        const parts = authorization.split(" ");
        token = parts.length === 2 && parts[0].toLowerCase() === "bearer"
            ? parts[1]
            : authorization;
    }

    // Keep cookie support for clients that do not use bearer authentication.
    if (!token) {
        token = req.cookies?.token;
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
