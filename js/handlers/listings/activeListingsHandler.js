import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchActiveListings } from "../../api/listings/fetchActiveListings.js";
import { displayListings } from "../../ui/listings/displayListings.js";

/**
 * Handles fetching and displaying active auction listings only.
 * Manages loading states and error handling for active listings display.
 *
 * @param {number} [limit=40] - The maximum number of active listings to fetch and display.
 * @returns {Promise<void>}
 * @throws {Error} When active listings fetch fails or API returns an error
 *
 * @example
 * // Fetch and display default number of active listings (40)
 * activeListingsHandler();
 *
 * @example
 * // Fetch and display specific number of active listings
 * activeListingsHandler(6);
 */
export async function activeListingsHandler(limit = 40) {
  const listingsLoader = document.querySelector("#listings-loader");
  const listingsContainer = document.querySelector("#listings-container");

  try {
    const listings = await fetchActiveListings(limit);
    displayListings(listings.data, listingsContainer);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingsLoader.classList.add("hidden");
  }
}
