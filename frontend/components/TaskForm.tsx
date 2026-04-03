'use client';

import { FormEvent, ChangeEvent, useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTask?: any;
}

export default function TaskForm({ onSubmit, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="input-field mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Task description (optional)..."
            className="input-field mt-1 resize-none"
            rows={4}
          />
        </div>

        <button type="submit" className="w-full btn btn-primary">
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
