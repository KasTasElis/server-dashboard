const API_BASE_URL = "https://playground.tesonet.lt/v1";

export const fetchToken = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) throw new Error("Invalid credentials. Please try again.");
  if (!response.ok) throw new Error("Unknown problem with response.");

  const data = await response.json();

  if (!data.token || typeof data.token !== "string") throw new Error("Response missing important data.");

  return data.token as string;
};

export type Server = {
  name: string;
  distance: number;
};

export const fetchServers = async (token: string): Promise<Server[]> => {
  const response = await fetch(`${API_BASE_URL}/servers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Unknown problem with response.");

  return response.json();
};
