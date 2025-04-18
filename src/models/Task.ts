export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: "todo" | "in_progress" | "done" | "placeholder";
  deadline: string;
  projectId?: string;
}

export type TaskStatus = "todo" | "in_progress" | "done";
