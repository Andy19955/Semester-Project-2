import { profileUrl } from "../../constants/apiUrls.js";
import { maxListings } from "../../constants/constants.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Fetches the posts for a given profile name.
 *
 * @param {string} name - The name of the profile to fetch posts for.
 * @param {number} postsPage - The page number to fetch posts from.
 * @returns {Promise<Object>} - A promise that resolves to the profile posts data.
 * @throws {Error} - Throws an error if the profile posts fetch fails.
 *
 * @example
 * fetchProfilePosts("JohnDoe", 1)
 *   .then(posts => console.log(posts))
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
    `${profileUrl}/${name}/listings?_bids=true&limit=${maxListings}&page=${listingsPage}`,
    options,
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed fetching listings.");
  }
  return json;
}
