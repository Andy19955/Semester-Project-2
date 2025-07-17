import { listingsUrl } from "../../constants/apiUrls.js";
import { maxListings } from "../../constants/constants.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Searches for auction listings based on the provided search query and page number.
 *
 * @param {Object} formData - The form data containing the search query.
 * @param {string} formData.searchQuery - The search query to use for searching listings.
 * @param {number} listingsPage - The page number to fetch listings from.
 * @returns {Promise<Object>} - A promise that resolves to the search results containing listings data.
 * @throws {Error} - Throws an error if the search fetch fails.
 *
 * @example
 * const formData = { searchQuery: "vintage watch" };
 * searchListingsApi(formData, 1)
 *   .then(listings => console.log(listings))
 *   .catch(error => console.error(error));
 */
export async function searchListingsApi(formData, listingsPage) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  };
  const response = await fetch(
    `${listingsUrl}/search?q=${formData.searchQuery}&limit=${maxListings}&page=${listingsPage}`,
    options,
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed fetching listings.");
  }
  return json;
}
