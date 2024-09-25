import React, { useState, useEffect } from "react";

const TaskForm = ({ currentTask, onSave, onCancel }) => {
  const [task, setTask] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    description: "",
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({
        assignedTo: "User 1",
        status: "Not Started",
        dueDate: "",
        priority: "Normal",
        description: "",
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className=" text-gray-700 font-semibold">
            Assigned To <span className="text-red-600">*</span>
          </label>
          <select
            name="assignedTo"
            value={task?.assignedTo}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            <option value="User 3">User 3</option>
          </select>
        </div>
        <div>
          <label className="text-gray-700 font-semibold">
            Status <span className="text-red-600">*</span>
          </label>
          <select
            name="status"
            value={task?.status}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="text-gray-700 font-semibold">
            Due Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="dueDate"
            value={task?.dueDate}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className=" text-gray-700 font-semibold">
            Priority <span className="text-red-600">*</span>
          </label>
          <select
            name="priority"
            value={task?.priority}
            onChange={handleChange}
            className="mt-2  w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className=" text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={task?.description}
            onChange={handleChange}
            className="mt-2  w-full p-2 border border-gray-300 rounded"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-400 text-white font-medium rounded hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
