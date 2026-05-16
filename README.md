# AI Candidate Profile Shortlisting System

A full-stack MERN web application that allows recruiters to add candidate profiles and intelligently shortlist them based on job requirements. The application features both a basic logic-matching algorithm (based on skill overlap and experience) and an advanced AI-powered ranking system using OpenRouter AI.

## 🚀 Features

- **Candidate Management**: Add, view, and manage candidate profiles with details like name, email, skills, and experience.
- **Job Matching (Basic Logic)**: Input required skills and minimum experience. The system calculates a Match Score (%) based on skill overlaps.
- **AI-Powered Shortlisting**: Integrates with OpenRouter AI to analyze top matching candidates, provide a ranked list, and generate a brief explanation/insight for each candidate's suitability.
- **Modern UI**: Built with React (Vite) utilizing a clean, rich glassmorphism aesthetic, responsive grid layouts, and color-coded match score indicators.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Vanilla CSS (Modern aesthetic), React Router DOM, Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose).
- **External API**: OpenRouter AI (GPT/Llama-based models) for intelligent profile analysis.

## 📦 Project Structure

The project is divided into two main directories:
- `/backend`: Node.js Express server.
- `/frontend`: React application built with Vite.

## 🔗 API Architecture

This application utilizes both internal REST APIs and an external third-party API.

### Internal REST APIs (Backend)
- `POST /api/candidates`: Adds a new candidate to the MongoDB database.
- `GET /api/candidates`: Fetches all registered candidates to display on the dashboard.
- `POST /api/match`: Processes basic shortlisting logic (calculates skill overlap % and filters by experience).
- `POST /api/match/ai/shortlist`: Calls the OpenRouter API to generate AI rankings and explanations for matched candidates.

### External AI API (OpenRouter)
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Triggered automatically when "Find Matches" is clicked and basic matches are found.

## 🚀 How to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the environment configuration below.
4. Start the server: `node server.js` (Runs on port 5000)

**Backend `.env` Configuration:**
```env
# Optional: Uses an in-memory MongoDB database by default if not provided
MONGO_URI=mongodb+srv://<username>:<password>@cluster...
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Set the API Base URL in `src/config.js` or `.env` if deploying.
4. Start the Vite dev server: `npm run dev`
5. Open your browser to `http://localhost:5173`

## 🌍 Deployment

To deploy this application to a service like **Render**:
1. Push this entire repository to GitHub.
2. In Render, create a new **Web Service** for the `backend` folder. Add the `MONGO_URI` and `OPENROUTER_API_KEY` to the Environment Variables.
3. Create a new **Static Site** for the `frontend` folder. Set the build command to `npm run build` and the publish directory to `dist`.
4. Update `frontend/src/config.js` to use the deployed Render Web Service URL.
