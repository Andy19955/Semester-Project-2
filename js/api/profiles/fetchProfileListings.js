import { profileUrl } from "../../constants/apiUrls.js";
import { maxListings } from "../../constants/constants.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Fetches the listings for a given profile name.
 *
 * @param {string} name - The name of the profile to fetch listings for.
 * @param {number} listingsPage - The page number to fetch listings from.
 * @returns {Promise<Object>} - A promise that resolves to the profile listings data.
 * @throws {Error} - Throws an error if the profile listings fetch fails.
 *
 * @example
 * fetchProfileListings("JohnDoe", 1)
 *   .then(listings => console.log(listings))
 *   .catch(error => console.error(error));
 */
export async function fetchProfileListings(name, listingsPage) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  };

  const response = await fetch(
    `${profileUrl}/${name}/listings?_bids=true&limit=${maxListings}&page=${listingsPage}&sort=endsAt&sortOrder=asc`,
    options,
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed fetching listings.");
  }
  return json;
}
