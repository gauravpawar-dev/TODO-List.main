import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  const mockCurrentTask = {
    assignedTo: "User 2",
    status: "In Progress",
    dueDate: "2023-05-01",
    priority: "High",
    description: "Test task description",
  };

  it("renders correctly with default values when no currentTask is provided", () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/Assigned To/i)).toHaveValue("User 1");
    expect(screen.getByLabelText(/Status/i)).toHaveValue("Not Started");
    expect(screen.getByLabelText(/Due Date/i)).toHaveValue("");
    expect(screen.getByLabelText(/Priority/i)).toHaveValue("Normal");
    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
  });

  it("renders correctly with currentTask values", () => {
    render(
      <TaskForm
        currentTask={mockCurrentTask}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/Assigned To/i)).toHaveValue("User 2");
    expect(screen.getByLabelText(/Status/i)).toHaveValue("In Progress");
    expect(screen.getByLabelText(/Due Date/i)).toHaveValue("2023-05-01");
    expect(screen.getByLabelText(/Priority/i)).toHaveValue("High");
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      "Test task description"
    );
  });

  it("updates form fields when user types", () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/Assigned To/i), {
      target: { value: "User 3" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "Completed" },
    });
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: "2023-06-01" },
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: "Low" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New description" },
    });

    expect(screen.getByLabelText(/Assigned To/i)).toHaveValue("User 3");
    expect(screen.getByLabelText(/Status/i)).toHaveValue("Completed");
    expect(screen.getByLabelText(/Due Date/i)).toHaveValue("2023-06-01");
    expect(screen.getByLabelText(/Priority/i)).toHaveValue("Low");
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      "New description"
    );
  });

  it("calls onSave with form data when form is submitted", () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/Assigned To/i), {
      target: { value: "User 3" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "Completed" },
    });
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: "2023-06-01" },
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: "Low" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New description" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      assignedTo: "User 3",
      status: "Completed",
      dueDate: "2023-06-01",
      priority: "Low",
      description: "New description",
    });
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
