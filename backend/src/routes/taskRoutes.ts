import { Router } from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';

const taskRoutes = Router();

// All task routes require authentication
taskRoutes.use(authMiddleware);

taskRoutes.get('/', getTasks);
taskRoutes.post('/', createTask);
taskRoutes.get('/:id', getTask);
taskRoutes.patch('/:id', updateTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.patch('/:id/toggle', toggleTaskStatus);

export default taskRoutes;
