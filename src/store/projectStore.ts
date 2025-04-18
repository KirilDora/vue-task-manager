import { defineStore } from "pinia";
import { type Project } from "../models/Project";
import { fetchGitHubProjects } from "../utils/github";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    loadProjects() {
      const data = localStorage.getItem("projects");
      if (data) this.projects = JSON.parse(data);
    },
    saveProjects() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
    addProject(project: Project) {
      this.projects.push(project);
      this.saveProjects();
    },
    async loadFromGitHub(username: string) {
      const projects = await fetchGitHubProjects(username);
      this.projects = projects;
      this.saveProjects();
    },
  },
});
