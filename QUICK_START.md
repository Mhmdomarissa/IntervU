# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ 
- PostgreSQL (or use a cloud database)
- OpenAI API key

## 1. Install Dependencies
```bash
# Install all dependencies for the monorepo
npm run install:all
```

## 2. Set Up Database
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env with your database URL and OpenAI API key
# DATABASE_URL="postgresql://username:password@localhost:5432/intervu"
# OPENAI_API_KEY="your-openai-api-key-here"
```

## 3. Set Up Database Schema
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

## 4. Start Development Servers
```bash
# From the root directory
npm run dev
```

This will start:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## 5. Test the Application
1. Open http://localhost:3000
2. Select a role (e.g., "Frontend React Developer")
3. Choose experience level (e.g., "Junior")
4. Click "Generate Interview"
5. View your AI-generated interview questions!

## Troubleshooting

### If you get database errors:
- Make sure PostgreSQL is running
- Check your DATABASE_URL in backend/.env
- Run `npx prisma db push` as an alternative to migrations

### If you get OpenAI errors:
- Make sure your OPENAI_API_KEY is set correctly
- Check that you have credits in your OpenAI account

### If frontend can't connect to backend:
- Make sure both servers are running
- Check that the backend is on port 3001
- Verify CORS settings in backend/src/server.ts

## Project Structure
```
IntervU/
├── frontend/          # Next.js React app
├── backend/           # Express API server
├── shared/            # Shared TypeScript types
└── docs/              # Documentation
```

## Key Features Implemented
- ✅ Role selection with predefined tech roles
- ✅ Experience level selection (Beginner to Senior)
- ✅ AI-powered interview question generation
- ✅ Beautiful UI with TailwindCSS
- ✅ Question navigation and display
- ✅ Multiple question types (MCQ, Coding, Conceptual)
- ✅ Professional project structure 