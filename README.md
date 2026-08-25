
PrepForge - AI based interview preparation app
AI Interview Prep & Resume Builder
An AI-powered full-stack web application that generates personalized interview preparation reports and tailored ATS-friendly PDF resumes based on job descriptions, user self-descriptions, and uploaded resumes.

🚀 Key Features
AI Interview Reports: Generates match scores, targeted technical & behavioral questions with model answers, identified skill gaps with severity levels, and a 5-day step-by-step preparation plan.

Tailored PDF Resume Generation: Dynamically creates ATS-friendly, professionally styled PDF resumes tailored to specific job descriptions using Puppeteer.

User Authentication: Secure JWT-based registration and login system with persistent authorization headers.

Report History: View and manage past interview analysis reports saved to your account.

🛠️ Tech Stack
Frontend
Framework: React (Vite)

HTTP Client: Axios (with request/response interceptors for JWT & CORS handling)

State Management: React Context API & Custom Hooks (useInterview, useAuth)

Routing: React Router

Backend
Runtime: Node.js & Express.js

Database: MongoDB (Mongoose ODM)

AI Integration: @google/genai (Google Gemini 2.5 Flash API)

PDF Generation: Puppeteer

Validation: Zod & zod-to-json-schema

Auth: JSON Web Tokens (JWT) & bcrypt

📁 Project Structure
Plaintext
gen-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Express controllers (interview, auth)
│   │   ├── middleware/     # Auth & CORS middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   └── services/       # AI service (Gemini API) & Puppeteer PDF generator
│   ├── .env.example
│   ├── .gitignore
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React Context providers
    │   ├── hooks/          # Custom hooks (useInterview, useAuth)
    │   ├── pages/          # Home, Login, Register, Report view pages
    │   └── services/       # Axios API setup & request functions
    ├── .env.example
    └── vite.config.js

    ⚙️ Environment Setup
Backend .env
Create a .env file inside the backend/ folder:

Code snippet
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/interview_db
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=AIzaSyYourGoogleGeminiApiKeyHere
FRONTEND_URL=http://localhost:5173

Frontend .env
Create a .env file inside the frontend/ folder:

Code snippet
VITE_BACKEND_URL=http://localhost:3000
📦 Installation & Local Development
1. Clone the Repository
Bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Backend Setup
Bash
cd backend
npm install
npm run dev
Server will start on http://localhost:3000

3. Frontend Setup
Open a new terminal tab or window:

Bash
cd frontend
npm install
npm run dev
App will start on http://localhost:5173
