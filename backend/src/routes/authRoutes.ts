import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/refresh', refresh);
authRoutes.post('/logout', authMiddleware, logout);

export default authRoutes;
