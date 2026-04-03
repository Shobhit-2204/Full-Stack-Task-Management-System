import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    if (!payload) {
      res.status(401).json({ error: 'Invalid or expired access token' });
      return;
    }

    req.userId = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  
  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
