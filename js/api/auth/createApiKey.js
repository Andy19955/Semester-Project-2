import { getToken } from "../../helpers/storage.js";
import { apiKeyUrl } from "../../constants/apiUrls.js";

/**
 * Creates a new API key for the authenticated user.
 *
 * @returns {Promise<Object>} - A promise that resolves to the API key data.
 * @throws {Error} - Throws an error if the API key creation fails.
 *
 * @example
 * createApiKey()
 *   .then(apiKey => console.log(apiKey))
 *   .catch(error => console.error(error));
 */
export async function createApiKey() {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await fetch(apiKeyUrl, options);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "An error occured.");
  }
  return json;
}
