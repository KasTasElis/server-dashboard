import { Server } from "../api";

export type SortBy =
  | "name-ascending"
  | "name-descending"
  | "distance-ascending"
  | "distance-descending";

export const getSortedServerData = (data: Server[], sorting?: SortBy) => {
  if (sorting === "name-ascending") return sortServersByNameAscending(data);
  if (sorting === "name-descending") return sortServersByNameDescending(data);
  if (sorting === "distance-ascending")
    return sortServersByDistanceAscending(data);
  if (sorting === "distance-descending")
    return sortServersByDistanceDescending(data);

  return data;
};

export const sortServersByDistanceAscending = (servers: Server[]) => {
  return [...servers].sort((a, b) => a.distance - b.distance);
};

export const sortServersByDistanceDescending = (servers: Server[]) => {
  return [...servers].sort((a, b) => b.distance - a.distance);
};

export const sortServersByNameAscending = (servers: Server[]) => {
  return [...servers].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortServersByNameDescending = (servers: Server[]) => {
  return [...servers].sort((a, b) => b.name.localeCompare(a.name));
};
