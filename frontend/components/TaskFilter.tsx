'use client';

import { ChangeEvent } from 'react';

interface TaskFilterProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export default function TaskFilter({ statusFilter, onStatusChange }: TaskFilterProps) {
  return (
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Status
      </label>
      <select
        id="status"
        value={statusFilter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onStatusChange(e.target.value)}
        className="input-field"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
