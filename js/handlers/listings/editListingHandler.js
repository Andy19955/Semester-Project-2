import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchSingleListing } from "../../api/listings/fetchSingleListing.js";
import { displayEditListing } from "../../ui/listings/displayEditListing.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";

/**
 * Handles fetching and displaying an auction listing for editing.
 * Extracts listing ID from URL query parameters, fetches the listing data,
 * and populates the edit form. Manages loading states and error handling.
 *
 * @returns {Promise<void>}
 * @throws {Error} When listing ID is missing from URL or listing fetch fails
 *
 * @example
 * // Called automatically when visiting /edit-listing/?id=123
 * editListingHandler();
 */
export async function editListingHandler() {
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
    displayEditListing(listing.data);
    listingContainer.classList.remove("hidden");
    listingContainer.classList.add("flex");
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    listingLoader.classList.add("hidden");
  }
}
