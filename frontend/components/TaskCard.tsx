'use client';

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold flex-1 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm font-medium"
        >
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
