import { loginUrl } from "../../constants/apiUrls.js";

/**
 * Authenticates user login via API.
 *
 * @param {Object} loginData - User login data
 * @param {string} loginData.email - User's email address
 * @param {string} loginData.password - User's password
 * @returns {Promise<Object>} Login response from API containing access token and user data
 * @throws {Error} When login fails or API returns error
 *
 * @example
 * const loginData = {
 *   email: "john@noroff.no",
 *   password: "password123"
 * };
 * const result = await loginFormApi(loginData);
 */
export async function loginFormApi(loginData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  const response = await fetch(loginUrl, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed.");
  }
  return json;
}
