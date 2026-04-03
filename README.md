# Task Management System

A complete full-stack task management application with user authentication, task CRUD operations, and a responsive UI.

## 📁 Project Structure

```
Task Management System/
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & error handling
│   │   ├── utils/         # JWT & password utilities
│   │   └── index.ts       # Express server
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/              # Next.js React application
    ├── app/               # Next.js App Router
    │   ├── page.tsx       # Home page
    │   ├── login/
    │   ├── register/
    │   ├── dashboard/
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/        # React components
    ├── lib/              # Utilities & API client
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── .env.local
```

## 🔧 Tech Stack

### Backend
- **Node.js v22 LTS+** - JavaScript runtime
- **Express.js ^4.21.0** - Web framework
- **TypeScript ^6.0.2** - Type-safe JavaScript
- **Prisma ORM ^7.6.0** - Database access
- **PostgreSQL** - Database (via Neon)
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication

### Frontend
- **Next.js ^16.2.2** - React framework (App Router)
- **React ^19.2.4** - UI library
- **TypeScript ^6.0.2** - Type-safe JavaScript
- **Tailwind CSS ^4.2.2** - Utility-first CSS
- **Axios** - HTTP client
- **react-hot-toast** - Toast notifications

## 📋 Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Access tokens (15 minutes) and refresh tokens (7 days)
- Automatic token refresh on expiry
- Logout functionality

### Task Management
- Create, Read, Update, Delete (CRUD) operations
- Task status management (pending, in-progress, completed)
- Task toggling between statuses
- Pagination with configurable page size
- Filter tasks by status
- Search tasks by title
- Timestamps for creation and updates

### UI/UX
- Clean, responsive design
- Mobile-friendly interface
- Toast notifications for feedback
- Loading states
- Error handling
- Page transitions

## 🚀 Getting Started

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database and secret keys

5. Generate Prisma and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

## 🌐 Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## 🔐 Authentication Flow

1. User registers or logs in via the frontend
2. Backend validates credentials and returns access & refresh tokens
3. Frontend stores tokens in localStorage
4. Subsequent API requests include the access token in headers
5. When access token expires, frontend automatically uses refresh token
6. New access token is obtained without user interaction
7. If refresh token expires, user is redirected to login

## 📚 API Documentation

See [Backend README](./backend/README.md) for detailed API endpoint documentation.

## 🎨 UI Components

- **Login Page** - User authentication
- **Register Page** - New user sign-up
- **Dashboard** - Main task management interface
- **TaskCard** - Individual task display with actions
- **TaskForm** - Create and edit tasks
- **TaskFilter** - Filter tasks by status
- **Responsive Layout** - Works on all screen sizes

## 🛠️ Development Commands

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run prisma:migrate  # Create new migration
npm run prisma:studio   # Open Prisma Studio
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
```

## 📝 Environment Configuration

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🔄 Database Schema

### User Model
- `id` - Primary key
- `email` - Unique email
- `password` - Hashed password
- `createdAt` - Timestamp
- `updatedAt` - Timestamp
- `tasks` - Relationship to tasks

### Task Model
- `id` - Primary key
- `title` - Task title
- `description` - Optional description
- `status` - pending, in-progress, or completed
- `userId` - Foreign key to user
- `user` - Relationship to user
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## 🚢 Deployment

### Backend
- Deploy to platforms like Heroku, Railway, or Vercel
- Set production environment variables
- Ensure PostgreSQL database is accessible

### Frontend
- Deploy to Vercel, Netlify, or any static host
- Update `NEXT_PUBLIC_API_URL` to production API URL
- Build: `npm run build`

## 💡 Best Practices

- Keep sensitive data in environment variables
- Validate all inputs on both frontend and backend
- Use HTTPS in production
- Regularly update dependencies
- Implement proper error handling
- Add rate limiting for API endpoints
- Use CORS carefully

## 📄 License

MIT

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Built with ❤️ using modern web technologies**
