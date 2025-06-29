import { registrationUrl } from "../../constants/apiUrls.js";

/**
 * Registers a new user account via API.
 *
 * @param {Object} registrationData - User registration data
 * @param {string} registrationData.name - User's name
 * @param {string} registrationData.email - User's email address
 * @param {string} registrationData.password - User's password
 * @param {Object} [registrationData.avatar] - Optional avatar object
 * @returns {Promise<Object>} Registration response from API
 * @throws {Error} When registration fails or API returns error
 *
 * @example
 * const registrationData = {
 *   name: "John Doe",
 *   email: "john@noroff.no",
 *   password: "password123"
 * };
 * const result = await registrationFormApi(registrationData);
 */
export async function registrationFormApi(registrationData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  };

  const response = await fetch(registrationUrl, options);
  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed.");
  }
  return json;
}
