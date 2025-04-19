import type { TaskStatus } from "../models/Task";

export const TASK_STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "До виконання",
  in_progress: "В процесі",
  done: "Завершено",
};
