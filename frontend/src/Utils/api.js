export const fetchWithRetry = async (
  url,
  options = {},
  retries = 3,
  timeout = 30000
) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      console.log(`Fetching ${url}, attempt ${i + 1}`);
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
        credentials: "include",
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const err = new Error(`HTTP error ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn(`Fetch attempt ${i + 1} failed for ${url}:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
};