import { fetcher } from "./api";

export const getMetrics = async (page = 1, limit = 10) => {
  return fetcher(`/metrics?page=${page}&limit=${limit}`);
};