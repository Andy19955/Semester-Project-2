import { listingsUrl } from "../../constants/apiUrls.js";

/**
 * Fetches active auction listings from the API with pagination support.
 * Returns listings sorted by end date in ascending order (ending soonest first).
 *
 * @param {number} limit - Maximum number of active listings to fetch per page
 * @param {number} [page] - Page number for pagination (optional)
 * @returns {Promise<Object>} Listings response from API containing active auction data and pagination metadata
 * @throws {Error} When active listings fetch fails or API returns error
 *
 * @example
 * // Fetch first page of 10 active listings
 * const activeListings = await fetchActiveListings(10, 1);
 * console.log(activeListings.data); // Array of up to 10 active listings
 * console.log(activeListings.meta.isLastPage); // Boolean indicating if this is the last page
 *
 * @example
 * // Fetch without pagination
 * const activeListings = await fetchActiveListings(20);
 */
export async function fetchActiveListings(limit, page) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${listingsUrl}/?limit=${limit}&page=${page}&_active=true&sort=endsAt&sortOrder=asc`,
    options,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listings failed.");
  }
  return json;
}
