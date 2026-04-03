'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-600 to-blue-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Task Management System</h1>
        <p className="text-xl text-blue-100 mb-8">Organize and manage your tasks efficiently</p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Log In
          </a>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
