'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getTasks, createTask, logoutUser, deleteTask, toggleTaskStatus } from '@/lib/api';
import { getTokens } from '@/lib/apiClient';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import TaskFilter from '@/components/TaskFilter';

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Check authentication
  useEffect(() => {
    const { accessToken } = getTokens();
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(page, 10, statusFilter || undefined, search || undefined);
        setTasks(data.tasks);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [page, statusFilter, search]);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await createTask({ title, description });
      toast.success('Task created successfully');
      setShowForm(false);
      setPage(1);
      // Refetch tasks
      const data = await getTasks(1, 10, statusFilter || undefined, search || undefined);
      setTasks(data.tasks);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully');
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleTask = async (taskId: number) => {
    try {
      const response = await toggleTaskStatus(taskId);
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? response.task : t
      );
      setTasks(updatedTasks);
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Controls Section */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Tasks
            </label>
            <input
              type="text"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              placeholder="Search by title..."
              className="input-field w-full"
            />
          </div>

          <div>
            <TaskFilter 
              statusFilter={statusFilter}
              onStatusChange={(status) => {
                setStatusFilter(status);
                setPage(1);
              }}
            />
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(!showForm);
            }}
            className="w-full md:w-auto btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSubmit={handleCreateTask}
              initialTask={editingTask}
            />
          </div>
        )}

        {/* Tasks Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 card">
            <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center px-4">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
