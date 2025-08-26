import { profileUrl } from "../../constants/apiUrls.js";
import { maxListings } from "../../constants/constants.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Fetches the active bids for a given profile name.
 * Returns all listings where the user has placed bids that are still active.
 *
 * @param {string} name - The name of the profile to fetch bids for.
 * @param {number} page - The page number to fetch bids from.
 * @returns {Promise<Object>} - A promise that resolves to the profile bids data.
 * @throws {Error} - Throws an error if the profile bids fetch fails.
 *
 * @example
 * fetchProfileBids("JohnDoe", 1)
 *   .then(bids => console.log(bids))
 *   .catch(error => console.error(error));
 */
export async function fetchProfileBids(name, page) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  };

  const response = await fetch(
    `${profileUrl}/${name}/bids?_listings=true&limit=${maxListings}&page=${page}&sort=created&sortOrder=desc`,
    options,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Failed fetching active bids.",
    );
  }
  return json;
}
