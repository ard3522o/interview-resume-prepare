const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cookieParser())
// backend/src/app.js
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, curl)
    if (!origin) return callback(null, true);
    // Allow any Vercel preview / production deploy
    if (/\.vercel\.app$/i.test(origin)) return callback(null, true);
    // Allow explicitly listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js")
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app