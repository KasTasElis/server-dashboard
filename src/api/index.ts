const API_BASE_URL = "https://playground.tesonet.lt/v1";

export const fetchToken = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Problem with response.");

    const data = await response.json();

    if (!data.token) throw new Error("Response missing token.");

    return data.token as string;
  } catch (_error) {
    throw new Error("Invalid credentials.");
  }
};

export const fetchServers = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Problem with response.");

    return response.json();
  } catch (_error) {
    throw new Error("Failed to fetch servers");
  }
};
