export interface Project {
  id: number;
  name: string;
  taskCount: number;
  status: "active" | "completed" | "archived";
  createdAt: string;
  description?: string;
}

export interface FilterOptions {
  search: string;
  status: string;
}