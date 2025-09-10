import { profileUrl } from "../../constants/apiUrls.js";
import { getToken } from "../../helpers/storage.js";
import { getKey } from "../../functions/getKey.js";

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
export async function fetchProfile(name) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": await getKey(),
    },
  };

  const response = await fetch(`${profileUrl}/${name}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Fetching profile data failed.",
    );
  }
  return json;
}
