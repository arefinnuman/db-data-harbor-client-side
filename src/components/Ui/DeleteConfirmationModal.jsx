const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:w-80 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-700 rounded-lg"></div>
        <h2 className="text-xl font-semibold text-white mb-2 relative z-10">
          Confirm Delete
        </h2>
        <p className="text-white mb-3 relative z-10">
          Are you sure you want to delete this?
        </p>
        <div className="flex justify-end relative z-10">
          <button
            className="px-3 py-1 mr-2 bg-error text-white rounded hover:bg-red-700 transition duration-300"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-primary transition duration-300 hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
