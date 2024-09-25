import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteModal from "./DeleteModal";

describe("DeleteModal", () => {
  const mockOnDelete = jest.fn();
  const mockOnCancel = jest.fn();
  const mockTask = { id: 1, title: "Test Task" };
  const mockUser = "Test User";

  it("does not render when show is false", () => {
    render(
      <DeleteModal
        show={false}
        task={mockTask}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
        user={mockUser}
      />
    );
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("renders correctly when show is true", () => {
    render(
      <DeleteModal
        show={true}
        task={mockTask}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
        user={mockUser}
      />
    );
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(
      screen.getByText(`Do you want to delete task: ${mockUser}?`)
    ).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it('calls onCancel when "No" button is clicked', () => {
    render(
      <DeleteModal
        show={true}
        task={mockTask}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
        user={mockUser}
      />
    );
    fireEvent.click(screen.getByText("No"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete with task when "Yes" button is clicked', () => {
    render(
      <DeleteModal
        show={true}
        task={mockTask}
        onDelete={mockOnDelete}
        onCancel={mockOnCancel}
        user={mockUser}
      />
    );
    fireEvent.click(screen.getByText("Yes"));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask);
  });
});
