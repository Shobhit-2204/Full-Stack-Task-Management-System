import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/auth';

interface CreateTaskBody {
  title: string;
  description?: string;
}

interface UpdateTaskBody {
  title?: string;
  description?: string;
  status?: string;
}

export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Query parameters for pagination, filtering, and search
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = { userId };
    if (status) {
      where.status = status;
    }
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    // Fetch tasks and total count
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    res.status(200).json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { title, description } = req.body as CreateTaskBody;

    // Validation
    if (!title || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    if (title.length > 255) {
      res.status(400).json({ error: 'Title must be less than 255 characters' });
      return;
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const taskId = parseInt(req.params.id);

    // Fetch task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if task exists and belongs to user
    if (!task || task.userId !== userId) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body as UpdateTaskBody;

    // Fetch task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if task exists and belongs to user
    if (!task || task.userId !== userId) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Validation
    if (title !== undefined && (title.trim() === '' || title.length > 255)) {
      res.status(400).json({ error: 'Title must be between 1 and 255 characters' });
      return;
    }

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status !== undefined && !validStatuses.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
      return;
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
      },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const taskId = parseInt(req.params.id);

    // Fetch task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if task exists and belongs to user
    if (!task || task.userId !== userId) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Delete task
    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const toggleTaskStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const taskId = parseInt(req.params.id);

    // Fetch task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if task exists and belongs to user
    if (!task || task.userId !== userId) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Toggle status
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    res.status(200).json({
      message: 'Task status toggled successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Toggle task status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
