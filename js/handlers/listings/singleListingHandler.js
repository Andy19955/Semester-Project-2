import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchSingleListing } from "../../api/listings/fetchSingleListing.js";
import { displaySingleListing } from "../../ui/listings/displaySingleListing.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";

/**
 * Handles fetching and displaying a single auction listing.
 * Extracts listing ID from URL query parameters, fetches the listing data, and displays it on the page.
 * Manages loading states and error handling for single listing display.
 *
 * @returns {Promise<void>}
 * @throws {Error} When listing ID is missing from URL or single listing fetch fails
 *
 * @example
 * // Called automatically when visiting /listing/?id=123
 * singleListingHandler();
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
    displaySingleListing(listing.data);
    listingContainer.classList.remove("hidden");
    listingContainer.classList.add("flex");
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingLoader.classList.add("hidden");
  }
}
