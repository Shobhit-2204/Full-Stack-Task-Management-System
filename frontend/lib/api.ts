import apiClient, { setTokens, clearTokens } from './apiClient';

interface RegisterPayload {
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: { id: number; email: string };
}

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth APIs
export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', data);
  const { accessToken } = response.data;
  setTokens(accessToken);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  const { accessToken } = response.data;
  setTokens(accessToken);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearTokens();
  }
};

// Task APIs
export const getTasks = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
  search?: string
): Promise<TasksResponse> => {
  const params: any = { page, limit };
  if (status) params.status = status;
  if (search) params.search = search;
  const response = await apiClient.get('/tasks', { params });
  return response.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
}): Promise<{ task: Task }> => {
  const response = await apiClient.post('/tasks', data);
  return response.data;
};

export const getTaskById = async (id: number): Promise<{ task: Task }> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const updateTask = async (
  id: number,
  data: { title?: string; description?: string; status?: string }
): Promise<{ task: Task }> => {
  const response = await apiClient.patch(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

export const toggleTaskStatus = async (id: number): Promise<{ task: Task }> => {
  const response = await apiClient.patch(`/tasks/${id}/toggle`);
  return response.data;
};
