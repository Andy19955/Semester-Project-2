import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchActiveListings } from "../../api/listings/fetchActiveListings.js";
import { displayListings } from "../../ui/listings/displayListings.js";
import {
  activeListingsInfiniteScroll,
  setupActiveListingsInfiniteScroll,
} from "../../helpers/activeListingsInfiniteScroll.js";

/**
 * Handles fetching and displaying active auction listings only.
 * Manages loading states, error handling, and optional infinite scroll setup for active listings display.
 *
 * @param {number} [limit=40] - The maximum number of active listings to fetch and display.
 * @param {number} [page] - The page number for pagination (used with infinite scroll).
 * @param {boolean} [scrollLoader] - Whether to set up infinite scroll functionality.
 * @param {boolean} [active=true] - Whether to fetch only active listings.
 * @returns {Promise<void>}
 * @throws {Error} When active listings fetch fails or API returns an error
 *
 * @example
 * // Fetch active listings with pagination and infinite scroll
 * activeListingsHandler(20, 1, true);
 */
export async function activeListingsHandler(
  limit,
  page,
  scrollLoader,
  active = true,
) {
  const listingsLoader = document.querySelector("#listings-loader");
  const listingsContainer = document.querySelector("#listings-container");

  window.removeEventListener("scroll", activeListingsInfiniteScroll);
  listingsContainer.replaceChildren();
  listingsLoader.classList.remove("hidden");

  try {
    const listings = await fetchActiveListings(limit, page, active);
    displayListings(listings.data, listingsContainer);
    if (scrollLoader) {
      setupActiveListingsInfiniteScroll(listings.meta.isLastPage, active);
    }
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingsLoader.classList.add("hidden");
  }
}
