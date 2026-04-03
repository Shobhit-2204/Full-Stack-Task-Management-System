# Task Management Backend API

A fully-featured REST API for task management built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js v22 LTS or higher
- PostgreSQL (or Neon for cloud)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL connection string and JWT secrets:
```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. Generate Prisma Client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user (requires auth)

### Tasks (All require authentication)
- `GET /tasks` - Get all tasks (supports pagination, filtering, and search)
  - Query params: `page`, `limit`, `status`, `search`
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/toggle` - Toggle task completion status

## 📋 Request/Response Examples

### Register
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

### Create Task
```bash
POST /tasks
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Design landing page",
  "description": "Create a responsive landing page design"
}
```

### Get Tasks with Filtering
```bash
GET /tasks?page=1&limit=10&status=pending&search=design
Authorization: Bearer <accessToken>
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Access & Refresh token system
- ✅ Input validation
- ✅ CORS protection
- ✅ Protected routes with middleware

## 📦 Dependencies

- **express**: ^4.21.0 - Web framework
- **@prisma/client**: ^7.6.0 - ORM
- **bcryptjs**: ^2.4.3 - Password hashing
- **jsonwebtoken**: ^9.1.2 - JWT tokens
- **cors**: ^2.8.5 - Cross-origin support
- **dotenv**: ^16.4.7 - Environment variables
- **typescript**: ^6.0.2 - Type safety

## 🛠️ Development

### Generate Prisma Migration
```bash
npm run prisma:migrate
```

### Open Prisma Studio
```bash
npm run prisma:studio
```

### Build
```bash
npm run build
```

### Start Production
```bash
npm run start
```

## 📝 License

MIT
