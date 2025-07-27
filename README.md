# IntervU - Technical Interview Preparation Platform

A comprehensive platform that prepares candidates for technical job interviews based on specific roles and experience levels.

## 🚀 Features

- **Role-Specific Preparation**: Tailored mock interviews for various tech roles (PHP Backend, React Frontend, DevOps, etc.)
- **Experience-Level Matching**: Questions adapted for Beginner, Junior, Mid, and Senior levels
- **Diverse Question Types**: Multiple choice, coding challenges, and conceptual questions
- **AI-Powered**: Leverages external LLM APIs (GPT/Gemini) with swappable architecture
- **Progress Tracking**: User session management and progress monitoring

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + Next.js + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis (optional)
- **AI Integration**: OpenAI GPT / Google Gemini APIs

### Project Structure
```
IntervU/
├── frontend/          # Next.js React frontend
├── backend/           # Express.js API server  
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd IntervU

# Install all dependencies
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your database and API keys

# Run database migrations
cd backend
npx prisma migrate dev

# Start development servers
npm run dev
```

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/intervu"

# AI APIs
OPENAI_API_KEY="your-openai-api-key"
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=3001
JWT_SECRET="your-jwt-secret"
```

## 📋 API Endpoints

### Core Endpoints
- `POST /api/generate-interview` - Generate tailored interview questions
- `GET /api/roles` - Get available roles and levels
- `POST /api/users/progress` - Save user progress
- `GET /api/users/sessions` - Get user session history

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build all packages for production
- `npm run dev:backend` - Start only backend server
- `npm run dev:frontend` - Start only frontend server

### Git Workflow
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test thoroughly
4. Submit a pull request to `develop`

## 📝 License

MIT License - see LICENSE file for details 