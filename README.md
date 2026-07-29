# SkillBridge-AI

Interview AI is a full-stack web application that helps students prepare for interviews using AI-powered guidance, document-aware context, and personalized preparation workflows.

## 🚀 Features

- **AI-powered interview preparation** using Gemini API
- **Full-stack architecture** with React frontend and Express backend
- **Authentication system** with JWT, cookies, and password hashing
- **Resume/document ingestion** with PDF upload and parsing
- **Structured API layer** with validation and modular backend design
- **MongoDB persistence** for user and application data

---

## 🧱 Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Sass

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Google GenAI SDK (`@google/genai`)
- JWT (`jsonwebtoken`)
- `bcryptjs`, `cookie-parser`, `cors`
- `multer`, `pdf-parse`, `puppeteer`
- `zod`, `zod-to-json-schema`

---

## 📁 Project Structure

```text
interview-ai-yt/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
└── Frontend/
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
```

---

## ⚙️ Prerequisites

Make sure you have:

- **Node.js** (v18+ recommended)
- **npm**
- **MongoDB** (local instance or MongoDB Atlas)

---

## 🔐 Environment Variables

Create a `.env` file in `Backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_gemini_api_key
```

> Add any other environment variables required by your backend modules.

---

## 📦 Installation

### 1) Clone the repository

```bash
git clone https://github.com/ankurdotio/interview-ai-yt.git
cd interview-ai-yt
```

### 2) Install backend dependencies

```bash
cd Backend
npm install
```

### 3) Install frontend dependencies

```bash
cd ../Frontend
npm install
```

---

## ▶️ Run Locally

### Start backend

```bash
cd Backend
npm run dev
```

Backend runs on: `http://localhost:3000`

### Start frontend

```bash
cd Frontend
npm run dev
```

Frontend runs on Vite dev server (typically `http://localhost:5173`)

---

## 🧩 Available Scripts

### Backend (`Backend/package.json`)
- `npm run dev` — start server with nodemon

### Frontend (`Frontend/package.json`)
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — lint codebase

---

## 🧠 How It Helps Students

Interview AI helps students by:

- Providing **personalized AI-based interview guidance**
- Reducing prep time with **targeted practice support**
- Improving confidence through **repeatable interview workflows**
- Enabling context-aware assistance from uploaded resume/documents

---

## 🔮 Suggested Next Improvements

- Add root-level scripts to run frontend + backend together
- Add Docker setup for one-command startup
- Add unit/integration tests
- Add API docs (OpenAPI/Swagger)
- Add deployment docs for frontend/backend environments

---

## 📜 License

No license is currently specified in this repository.
