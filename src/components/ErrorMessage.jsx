import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md max-w-4xl mx-auto mt-4">
      <p className="text-lg">{message || 'An error occurred.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;