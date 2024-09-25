import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskModal from "./TaskModal";

jest.mock("./TaskForm", () => {
  return function MockTaskForm({ onSave, onCancel }) {
    return (
      <div data-testid="mock-task-form">
        <button onClick={() => onSave({ id: 1, title: "Test Task" })}>
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe("TaskModal", () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();
  const mockTask = { id: 1, title: "Test Task" };

  it("does not render when show is false", () => {
    render(
      <TaskModal
        show={false}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByText("New Task")).not.toBeInTheDocument();
  });

  it('renders "New Task" when no task is provided', () => {
    render(
      <TaskModal
        show={true}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it('renders "Edit Task" when a task is provided', () => {
    render(
      <TaskModal
        show={true}
        task={mockTask}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <TaskModal
        show={true}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByText("×"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders TaskForm component", () => {
    render(
      <TaskModal
        show={true}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();
  });

  it("calls onSave when TaskForm save button is clicked", () => {
    render(
      <TaskModal
        show={true}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith({ id: 1, title: "Test Task" });
  });

  it("calls onClose when TaskForm cancel button is clicked", () => {
    render(
      <TaskModal
        show={true}
        task={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
