# Task Management Frontend

A modern, responsive task management web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js v22 LTS or higher
- npm or yarn

### Installation

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Features

- ✅ User Authentication (Login/Register)
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Task Filtering by Status
- ✅ Task Search by Title
- ✅ Pagination Support
- ✅ Task Status Toggle (Pending → Completed)
- ✅ Responsive Design (Desktop & Mobile)
- ✅ Toast Notifications
- ✅ Automatic Token Refresh
- ✅ Secure Token Management

## 📱 Pages

- `/` - Home page with login/signup links
- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main task dashboard (protected)

## 🛠️ Components

- **TaskForm** - Form to create/edit tasks
- **TaskCard** - Display individual task with actions
- **TaskFilter** - Filter tasks by status
- **Auth Utilities** - Handle login/logout and token management
- **API Client** - Axios instance with auto-refresh logic

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Automatic access token refresh
- ✅ HTTP-only token storage (via cookies or localStorage)
- ✅ Protected routes with middleware
- ✅ CORS security

## 📦 Dependencies

- **next**: ^16.2.2 - React framework
- **react**: ^19.2.4 - UI library
- **react-dom**: ^19.2.4 - React DOM
- **tailwindcss**: ^4.2.2 - CSS framework
- **axios**: ^1.6.7 - HTTP client
- **react-hot-toast**: ^2.4.1 - Toast notifications
- **typescript**: ^6.0.2 - Type safety

## 🎨 Styling

Tailwind CSS v4 with custom utility classes:
- `.btn` - Button base styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger/delete button
- `.input-field` - Input field styles
- `.card` - Card container

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

## 🔄 Token Management

The application handles JWT tokens automatically:

1. Access tokens are stored in localStorage
2. Refresh tokens are also stored for obtaining new access tokens
3. Expired access tokens trigger automatic refresh using the refresh token
4. Failed refresh attempts redirect to login page

## 📝 License

MIT
