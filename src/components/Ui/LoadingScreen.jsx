const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-70 bg-gray-400">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <div className="mt-4 text-lg font-semibold text-gray-700">
          Loading...{" "}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
