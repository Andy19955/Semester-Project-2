import { listingsUrl } from "../../constants/apiUrls.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

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
export async function createListingFormApi(listingData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(listingData),
  };

  const response = await fetch(listingsUrl, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Create auction listing failed.",
    );
  }
  return json;
}
