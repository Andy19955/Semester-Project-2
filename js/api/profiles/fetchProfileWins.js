import { profileUrl } from "../../constants/apiUrls.js";
import { maxListings } from "../../constants/constants.js";
import { getToken } from "../../helpers/storage.js";
import { getKey } from "../../helpers/getKey.js";

/**
 * Fetches the won auctions for a given profile name.
 * Returns all listings where the user was the winning bidder.
 *
 * @param {string} name - The name of the profile to fetch wins for.
 * @param {number} page - The page number to fetch wins from.
 * @returns {Promise<Object>} - A promise that resolves to the profile wins data.
 * @throws {Error} - Throws an error if the profile wins fetch fails.
 *
 * @example
 * fetchProfileWins("JohnDoe", 1)
 *   .then(wins => console.log(wins))
 *   .catch(error => console.error(error));
 */
export async function fetchProfileWins(name, page) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": await getKey(),
    },
  };

  const response = await fetch(
    `${profileUrl}/${name}/wins?limit=${maxListings}&page=${page}&sort=endsAt&sortOrder=desc`,
    options,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Failed fetching won auctions.",
    );
  }
  return json;
}
