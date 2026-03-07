import { fetcher } from "./api";

export const getSummary = async () => {
  return fetcher("/dashboard/summary");
};