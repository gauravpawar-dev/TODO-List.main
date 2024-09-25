const DeleteModal = ({ show, task, onDelete, onCancel, user }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="bg-red-600 text-white font-semibold p-4 rounded-t-lg">
          <h2 className="text-xl">Delete</h2>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-800">
            Do you want to delete task: <strong>{user}</strong>?
          </p>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
            >
              No
            </button>
            <button
              onClick={() => onDelete(task)}
              className="px-6 py-2 bg-yellow-400 text-white font-medium rounded hover:bg-yellow-500"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
