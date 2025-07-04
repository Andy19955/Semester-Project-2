import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchActiveListings } from "../../api/listings/fetchActiveListings.js";
import { displayListings } from "../../ui/listings/displayListings.js";
import { setupActiveListingsInfiniteScroll } from "../../helpers/activeListingsInfiniteScroll.js";

/**
 * Handles fetching and displaying active auction listings only.
 * Manages loading states, error handling, and optional infinite scroll setup for active listings display.
 *
 * @param {number} [limit=40] - The maximum number of active listings to fetch and display.
 * @param {number} [page] - The page number for pagination (used with infinite scroll).
 * @param {boolean} [scrollLoader] - Whether to set up infinite scroll functionality.
 * @returns {Promise<void>}
 * @throws {Error} When active listings fetch fails or API returns an error
 *
 * @example
 * // Fetch active listings with pagination and infinite scroll
 * activeListingsHandler(20, 1, true);
 */
export async function activeListingsHandler(limit, page, scrollLoader) {
  const listingsLoader = document.querySelector("#listings-loader");
  const listingsContainer = document.querySelector("#listings-container");

  try {
    const listings = await fetchActiveListings(limit, page);
    displayListings(listings.data, listingsContainer);
    if (scrollLoader) {
      window.addEventListener("scroll", () => {
        setupActiveListingsInfiniteScroll(listings.meta.isLastPage);
      });
    }
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingsLoader.classList.add("hidden");
  }
}
