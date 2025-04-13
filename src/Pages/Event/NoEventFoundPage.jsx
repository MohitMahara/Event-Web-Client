import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NoEventFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-black-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Event Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The event you are looking for doesn’t seem to exist. It might have been removed or the URL is incorrect.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

