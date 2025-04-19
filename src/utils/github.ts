import { type Project } from "../models/Project";
import axios from "axios";

export async function fetchGitHubProjects(
  username: string
): Promise<Project[]> {
  try {
    const response = await axios.get(
      `http://localhost:4400/api/projects/${username}`
    );
    const repos = response.data;

    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      taskCount: repo.open_issues_count,
      status: repo.open_issues_count > 0 ? "active" : "non active",
      createdAt: repo.created_at,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch GitHub repositories:", error);
    return [];
  }
}

export async function fetchGitHubTasks(
  username: string = "facebook",
  repoName: string
) {
  try {
    const response = await axios.get(
      `http://localhost:4400/api/tasks/${username}/${repoName}`
    );
    const tasks = response.data;

    return tasks.map((task: any) => {
      const deadline = new Date();
      const daysToAdd = Math.floor(Math.random() * 14) + 1;
      deadline.setDate(deadline.getDate() + daysToAdd);
      return {
        id: task.id,
        title: task.title,
        assignee: task.assignee?.login || "Unassgined",
        status: task.state === "closed" ? "done" : "todo",
        deadline: deadline.toLocaleDateString(),
        projectId: repoName,
      };
    });
  } catch (error) {
    console.error("❌ Failed to fetch tasks:", error);
    return [];
  }
}
