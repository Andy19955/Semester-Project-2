/**
 * Retrieves the API key based on the current environment.
 *
 * - If running on localhost or a local/test domain, imports the key from config.js.
 * - Otherwise, fetches the key from the Netlify serverless function endpoint.
 *
 * @returns {Promise<string>} Resolves to the API key string.
 * @throws {Error} If the API key cannot be fetched from the server.
 *
 * @example
 * const apiKey = await getKey();
 */
export async function getKey() {
  const hostname = window.location.hostname;
  const isLocalhost =
    ["localhost", "127.0.0.1", "::1"].includes(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".test");

  if (isLocalhost) {
    const { apiKey } = await import("../constants/config.js");
    return apiKey;
  } else {
    const response = await fetch("/.netlify/functions/getKeys");
    if (!response.ok) throw new Error("Failed to fetch API key");
    const data = await response.json();
    return data.apiKey;
  }
}
