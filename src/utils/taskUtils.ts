import type { Task, TaskStatus } from "../models/Task";

export function filterAndSortTasks(
  tasks: Task[],
  filters: { assignee: string; status: TaskStatus | "" },
  sortKey: "deadline" | "status",
  sortAsc: boolean
): Task[] {
  let list = tasks;

  if (filters.assignee) {
    list = list.filter((task) =>
      task.assignee?.toLowerCase().includes(filters.assignee.toLowerCase())
    );
  }

  if (filters.status) {
    list = list.filter((task) => task.status === filters.status);
  }

  return [...list].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    const aNum = typeof aVal === "string" ? Date.parse(aVal) : aVal;
    const bNum = typeof bVal === "string" ? Date.parse(bVal) : bVal;

    return sortAsc ? aNum - bNum : bNum - aNum;
  });
}
