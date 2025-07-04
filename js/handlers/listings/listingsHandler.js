import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchListings } from "../../api/listings/fetchListings.js";
import { displayListings } from "../../ui/listings/displayListings.js";

/**
 * Handles fetching and displaying the listings.
 *
 * @example
 * latestListingsHandler();
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
