import { listingsUrl } from "../../constants/apiUrls.js";

/**
 * Fetches active auction listings from the API.
 * Returns listings sorted by end date in ascending order (ending soonest first).
 *
 * @param {number} limit - Maximum number of active listings to fetch
 * @returns {Promise<Object>} Listings response from API containing active auction data
 * @throws {Error} When active listings fetch fails or API returns error
 *
 * @example
 * const activeListings = await fetchActiveListings(10);
 * console.log(activeListings.data); // Array of 10 active listings
 */
export async function fetchActiveListings(limit) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${listingsUrl}/?limit=${limit}&_active=true&sort=endsAt&sortOrder=asc`,
    options,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listings failed.");
  }
  return json;
}
