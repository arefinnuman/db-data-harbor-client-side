const LogoutScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <div className="mt-4 text-xl font-semibold text-gray-700">
          Logging Out...
        </div>
      </div>
    </div>
  );
};

export default LogoutScreen;
