import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchListings } from "../../api/listings/fetchListings.js";
import { displayListings } from "../../ui/listings/displayListings.js";

/**
 * Handles fetching and displaying auction listings.
 * Manages loading states and error handling for the listings display.
 *
 * @param {number} [limit=40] - The maximum number of listings to fetch and display.
 * @returns {Promise<void>}
 * @throws {Error} When listings fetch fails or API returns an error
 *
 * @example
 * // Fetch and display default number of listings (40)
 * listingsHandler();
 *
 * @example
 * // Fetch and display specific number of listings
 * listingsHandler(20);
 */
export async function listingsHandler(limit = 40) {
  const listingsLoader = document.querySelector("#listings-loader");
  const listingsContainer = document.querySelector("#listings-container");

  try {
    const listings = await fetchListings(limit);
    displayListings(listings.data, listingsContainer);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingsLoader.classList.add("hidden");
  }
}
