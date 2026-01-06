import React from 'react';

const ErrorMessage = ({ error }) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-mint-500 text-white rounded hover:bg-mint-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;

