const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-16 w-16 mx-auto mb-4 text-secondary-focus"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.845 3 7.97l3-2.678z"
          ></path>
        </svg>
        <div className="animate-spin-slow">
          <h1 className="text-3xl font-semibold mb-2">Loading...</h1>
        </div>

        <div className="text-lg opacity-70 text-center animate-bounce mt-5">
          Your experience is worth the wait.
        </div>
        <p className="text-lg opacity-75"></p>
      </div>
    </div>
  );
};

export default LoadingScreen;

