const BASE_URL = "http://localhost:5001/api";

export async function fetcher(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Failed to fetch API");
  }

  return res.json();
}