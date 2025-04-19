import type { Project } from "../models/Project";
import type { FilterOptions } from "../models/Project";

export function filterAndSortProjects(
  projects: Project[],
  filters: FilterOptions,
  sortKey: keyof Project,
  sortAsc: boolean
): Project[] {
  let list = [...projects];

  if (filters.search) {
    list = list.filter((project) =>
      project.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters.status) {
    list = list.filter((project) => project.status === filters.status);
  }

  list.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return sortAsc
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  return list;
}
