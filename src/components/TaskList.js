import React, { useState } from "react";
import { FaListCheck } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const TaskList = ({
  tasks,
  selectedTasks,
  onAdd,
  onEdit,
  onDelete,
  toggleTaskSelection,
  selectAllTasks,
  onRefresh,
}) => {
  const [showDropdown, setShowDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(4);

  const filteredTasks = tasks?.filter((task) =>
    task?.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = (taskId) => {
    setShowDropdown(showDropdown === taskId ? null : taskId);
  };

  const handleTasksPerPageChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setTasksPerPage(value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="overflow-x-auto w-full border bg-gray-400/20">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-pink-700 text-white p-2 rounded-md">
            <FaListCheck />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-gray-500 text-2xl">Tasks</div>
            <div className="font-bold text-gray-500 text-sm">All Tasks</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={onAdd}
            className="bg-yellow-200 py-2 px-6 border-r border-gray-200 text-gray-400 rounded-l-sm"
          >
            New Task
          </button>
          <button
            onClick={onRefresh}
            className="bg-yellow-200 py-2 px-6 text-gray-400 rounded-r-sm"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          {filteredTasks?.length} records
        </div>
        <div className="relative my-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md outline-none"
          />
          <IoIosSearch className="absolute h-6 w-6 top-2 left-44" />
        </div>
      </div>
      <div className="relative">
        <table className="min-w-full text-left text-sm text-gray-500 bg-white border border-gray-200 shadow-sm">
          <thead className="text-xs text-gray-700 bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  onChange={(e) => selectAllTasks(e.target.checked)}
                />
              </th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Comments</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentTasks?.map((task, index) => (
              <tr
                key={task?.id}
                className="hover:bg-gray-50 border-b border-gray-200 transition duration-200"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600"
                    checked={selectedTasks.includes(task?.id)}
                    onChange={() => toggleTaskSelection(task?.id)}
                  />
                </td>
                <td className="px-6 py-4">{task?.assignedTo}</td>
                <td className="px-6 py-4">{task?.status}</td>
                <td className="px-6 py-4">{task?.dueDate}</td>
                <td className="px-6 py-4">{task?.priority}</td>
                <td className="flex  justify-between gap-x-2 px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {task?.description}
                  </span>
                  <div className="text-sm text-gray-600">
                    <button
                      className="text-gray-600 border p-0.5 hover:text-blue-600 font-medium transition"
                      onClick={() => toggleDropdown(task?.id)}
                    >
                      &#x25BC;
                    </button>
                    {showDropdown === task?.id && (
                      <div className="absolute right-0 w-24 bg-white shadow-lg rounded-lg">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-800 bg-yellow-200"
                          onClick={() => {
                            onEdit(task?.id);
                            setShowDropdown(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-800 bg-yellow-200"
                          onClick={() => {
                            onDelete(task?.id, task?.assignedTo);
                            setShowDropdown(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center py-3 px-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={tasksPerPage}
            onChange={handleTasksPerPageChange}
            className="px-2 py-1 w-16 text-sm text-gray-600 bg-white border border-gray-300 rounded"
          />
        </div>
        <div className="inline-flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
          >
            &lt; Prev
          </button>
          <span className="text-sm text-gray-600">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredTasks.length / tasksPerPage)
            }
            className="px-2 py-1 text-sm text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
