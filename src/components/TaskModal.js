import React from "react";
import TaskForm from "./TaskForm";

const TaskModal = ({ show, task, onSave, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg border-b">
          <h2 className="text-xl font-medium text-gray-700">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <TaskForm currentTask={task} onSave={onSave} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
