import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";

jest.mock("react-icons/fa6", () => ({
  FaListCheck: () => <div data-testid="mock-fa-list-check" />,
}));
jest.mock("react-icons/io", () => ({
  IoIosSearch: () => <div data-testid="mock-io-ios-search" />,
}));

describe("TaskList", () => {
  const mockTasks = [
    {
      id: 1,
      assignedTo: "User 1",
      status: "In Progress",
      dueDate: "2023-05-01",
      priority: "High",
      description: "Task 1",
    },
    {
      id: 2,
      assignedTo: "User 2",
      status: "Not Started",
      dueDate: "2023-05-15",
      priority: "Medium",
      description: "Task 2",
    },
    {
      id: 3,
      assignedTo: "User 3",
      status: "Completed",
      dueDate: "2023-04-30",
      priority: "Low",
      description: "Task 3",
    },
  ];

  const mockProps = {
    tasks: mockTasks,
    selectedTasks: [],
    onAdd: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    toggleTaskSelection: jest.fn(),
    selectAllTasks: jest.fn(),
    onRefresh: jest.fn(),
  };

  it("renders the TaskList component", () => {
    render(<TaskList {...mockProps} />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("All Tasks")).toBeInTheDocument();
    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });

  it("displays the correct number of tasks", () => {
    render(<TaskList {...mockProps} />);
    expect(screen.getByText("3 records")).toBeInTheDocument();
  });

  it("renders the table headers", () => {
    render(<TaskList {...mockProps} />);
    expect(screen.getByText("Assigned To")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("renders task rows", () => {
    render(<TaskList {...mockProps} />);
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.assignedTo)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
      expect(screen.getByText(task.dueDate)).toBeInTheDocument();
      expect(screen.getByText(task.priority)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });

  it("calls onAdd when New Task button is clicked", () => {
    render(<TaskList {...mockProps} />);
    fireEvent.click(screen.getByText("New Task"));
    expect(mockProps.onAdd).toHaveBeenCalled();
  });

  it("calls onRefresh when Refresh button is clicked", () => {
    render(<TaskList {...mockProps} />);
    fireEvent.click(screen.getByText("Refresh"));
    expect(mockProps.onRefresh).toHaveBeenCalled();
  });

  it("filters tasks based on search input", () => {
    render(<TaskList {...mockProps} />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "User 1" } });
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.queryByText("User 2")).not.toBeInTheDocument();
    expect(screen.queryByText("User 3")).not.toBeInTheDocument();
  });

  it("changes tasks per page", () => {
    render(<TaskList {...mockProps} />);
    const tasksPerPageInput = screen.getByRole("spinbutton");
    fireEvent.change(tasksPerPageInput, { target: { value: "2" } });
    expect(tasksPerPageInput).toHaveValue(2);
    expect(screen.queryByText("User 3")).not.toBeInTheDocument();
  });
});
