import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import * as taskService from "./services/taskService";

jest.mock("./services/taskService");

jest.mock("./components/TaskList", () => {
  return function MockTaskList({ tasks, onAdd, onEdit, onDelete }) {
    return (
      <div data-testid="mock-task-list">
        <button onClick={onAdd}>Add Task</button>
        <button onClick={() => onEdit(1)}>Edit Task</button>
        <button onClick={() => onDelete(1)}>Delete Task</button>
      </div>
    );
  };
});

jest.mock("./components/TaskModal", () => {
  return function MockTaskModal({ show, onSave, onClose }) {
    if (!show) return null;
    return (
      <div data-testid="mock-task-modal">
        <button onClick={() => onSave({ id: 1, title: "New Task" })}>
          Save Task
        </button>
        <button onClick={onClose}>Close Modal</button>
      </div>
    );
  };
});

jest.mock("./components/DeleteModal", () => {
  return function MockDeleteModal({ show, onDelete, onCancel }) {
    if (!show) return null;
    return (
      <div data-testid="mock-delete-modal">
        <button onClick={() => onDelete({ id: 1 })}>Confirm Delete</button>
        <button onClick={onCancel}>Cancel Delete</button>
      </div>
    );
  };
});

describe("App", () => {
  beforeEach(() => {
    taskService.fetchTasks.mockResolvedValue([
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders TaskList component", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("mock-task-list")).toBeInTheDocument();
    });
  });

  it("fetches tasks on mount", async () => {
    render(<App />);
    await waitFor(() => {
      expect(taskService.fetchTasks).toHaveBeenCalledTimes(1);
    });
  });

  it("opens TaskModal when Add Task is clicked", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Add Task"));
    });
    expect(screen.getByTestId("mock-task-modal")).toBeInTheDocument();
  });

  it("opens TaskModal with current task when Edit Task is clicked", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Edit Task"));
    });
    expect(screen.getByTestId("mock-task-modal")).toBeInTheDocument();
  });

  it("opens DeleteModal when Delete Task is clicked", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Delete Task"));
    });
    expect(screen.getByTestId("mock-delete-modal")).toBeInTheDocument();
  });

  it("adds a new task when TaskModal save is clicked", async () => {
    taskService.addTask.mockResolvedValue({ id: 3, title: "New Task" });
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Add Task"));
    });
    fireEvent.click(screen.getByText("Save Task"));
    await waitFor(() => {
      expect(taskService.addTask).toHaveBeenCalledTimes(1);
      expect(taskService.fetchTasks).toHaveBeenCalledTimes(2);
    });
  });

  it("deletes a task when DeleteModal confirm is clicked", async () => {
    taskService.deleteTask.mockResolvedValue({});
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Delete Task"));
    });
    fireEvent.click(screen.getByText("Confirm Delete"));
    await waitFor(() => {
      expect(taskService.deleteTask).toHaveBeenCalledTimes(1);
      expect(taskService.fetchTasks).toHaveBeenCalledTimes(2);
    });
  });
});
