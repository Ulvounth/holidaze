import React from "react";

interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  loading,
  onClick,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More Venues"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
