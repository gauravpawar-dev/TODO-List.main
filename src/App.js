import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import DeleteModal from "./components/DeleteModal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const refreshTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (currentTask) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
    refreshTasks();
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    let taskToEdit = tasks?.find((t) => t?.id === task);
    setCurrentTask(taskToEdit);
    setShowModal(true);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleDeleteTask = async (task) => {
    try {
      if (taskToDelete) {
        await deleteTask(task);
      }
      refreshTasks();
      setTaskToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Task not found or already deleted.");
    }
  };

  const handleMultipleDelete = async () => {
    try {
      for (let taskId of selectedTasks) {
        await deleteTask(taskId);
      }
      refreshTasks();
      setSelectedTasks([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting tasks:", error);
      alert("Failed to delete selected tasks.");
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected?.includes(taskId)
        ? prevSelected?.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const selectAllTasks = (selectAll) => {
    if (selectAll) {
      setSelectedTasks(tasks?.map((task) => task?.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const openDeleteModal = (task, assignedTo) => {
    setUser(assignedTo);
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container flex items-center justify-center mx-auto h-screen">
      <TaskList
        tasks={tasks}
        selectedTasks={selectedTasks}
        onAdd={handleAddTask}
        onEdit={handleEditTask}
        onDelete={openDeleteModal}
        toggleTaskSelection={toggleTaskSelection}
        selectAllTasks={selectAllTasks}
        onRefresh={refreshTasks}
      />
      <TaskModal
        show={showModal}
        task={currentTask}
        onSave={handleSaveTask}
        onClose={() => setShowModal(false)}
      />
      <DeleteModal
        show={showDeleteModal}
        task={taskToDelete}
        user={user}
        selectedTaskCount={selectedTasks?.length}
        onDelete={handleDeleteTask}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default App;
