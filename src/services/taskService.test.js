import axios from "axios";
import { fetchTasks, addTask, updateTask, deleteTask } from "./taskService";

jest.mock("axios");

describe("taskService", () => {
  const API_URL = "http://localhost:3001/tasks";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTasks", () => {
    it("fetches tasks successfully from the API", async () => {
      const mockTasks = [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ];
      axios.get.mockResolvedValueOnce({ data: mockTasks });

      const result = await fetchTasks();

      expect(axios.get).toHaveBeenCalledWith(API_URL);
      expect(result).toEqual(mockTasks);
    });

    it("throws an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchTasks()).rejects.toThrow(errorMessage);
    });
  });

  describe("addTask", () => {
    it("adds a task successfully to the API", async () => {
      const newTask = { title: "New Task" };
      const mockResponse = { id: 3, ...newTask };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await addTask(newTask);

      expect(axios.post).toHaveBeenCalledWith(API_URL, newTask);
      expect(result).toEqual(mockResponse);
    });

    it("throws an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(addTask({})).rejects.toThrow(errorMessage);
    });
  });

  describe("updateTask", () => {
    it("updates a task successfully in the API", async () => {
      const updatedTask = { id: 1, title: "Updated Task" };
      axios.put.mockResolvedValueOnce({ data: updatedTask });

      const result = await updateTask(updatedTask);

      expect(axios.put).toHaveBeenCalledWith(
        `${API_URL}/${updatedTask.id}`,
        updatedTask
      );
      expect(result).toEqual(updatedTask);
    });

    it("throws an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      axios.put.mockRejectedValueOnce(new Error(errorMessage));

      await expect(updateTask({ id: 1 })).rejects.toThrow(errorMessage);
    });
  });

  describe("deleteTask", () => {
    it("deletes a task successfully from the API", async () => {
      const taskId = 1;
      axios.delete.mockResolvedValueOnce({});

      await deleteTask(taskId);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${taskId}`);
    });

    it("throws an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      axios.delete.mockRejectedValueOnce(new Error(errorMessage));

      await expect(deleteTask(1)).rejects.toThrow(errorMessage);
    });
  });
});
