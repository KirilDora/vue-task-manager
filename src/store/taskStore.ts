import { defineStore } from "pinia";
import { type Task } from "../models/Task";
import { fetchGitHubTasks } from "../utils/github";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    loadTasks() {
      const data = localStorage.getItem("tasks");
      if (data) this.tasks = JSON.parse(data);
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    addTask(task: Task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    getByProject(projectId: string) {
      return this.tasks.filter((task) => String(task.projectId) === projectId);
    },
    updateTasks(newTasks: Task[]) {
      this.tasks = newTasks;
      this.saveTasks();
    },
    async loadFromGitHub(username: string = "facebook", repository: string) {
      const tasks = await fetchGitHubTasks(username, repository);
      this.tasks = tasks;
      this.saveTasks();
    },
  },
});
