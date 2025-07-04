import { listingsUrl } from "../../constants/apiUrls.js";

/**
 * Fetches user profile data from API.
 *
 * @param {string} name - Username to fetch profile for
 * @returns {Promise<Object>} Profile response from API containing user data
 * @throws {Error} When profile fetch fails or API returns error
 *
 * @example
 * const username = "john_doe";
 * const profile = await fetchProfile(username);
 */
export async function fetchListings(limit) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${listingsUrl}/?limit=${limit}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listings failed.");
  }
  return json;
}
