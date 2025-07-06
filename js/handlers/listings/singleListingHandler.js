import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchSingleListing } from "../../api/listings/fetchSingleListing.js";
import { displaySingleListing } from "../../ui/listings/displaySingleListing.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";

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
export async function singleListingHandler() {
  const listingLoader = document.querySelector("#listing-loader");
  const listingContainer = document.querySelector("#listing-container");

  const listingId = getQueryParam("id");
  if (!listingId) {
    displayMessage(
      "#messageContainer",
      "error",
      "An error occurred while fetching the listing. Please try again.",
    );
    listingLoader.classList.add("hidden");
    return;
  }

  try {
    const listing = await fetchSingleListing(listingId);
    console.log(listing);
    displaySingleListing(listing.data, listingContainer);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingLoader.classList.add("hidden");
  }
}
