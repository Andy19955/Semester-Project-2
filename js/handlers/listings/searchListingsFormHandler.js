import { searchListingsApi } from "../../api/listings/searchListingsApi.js";
import { displayListings } from "../../ui/listings/displayListings.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { setupSearchInfiniteScroll } from "../../helpers/searchInfiniteScroll.js";
import { maxListings } from "../../constants/constants.js";
import { activeListingsInfiniteScroll } from "../../helpers/activeListingsInfiniteScroll.js";

/**
 * Handles search listings form submission and displays filtered results.
 * Processes search form data, calls search API, displays matching listings,
 * and sets up infinite scroll if needed. Manages loading states and error handling.
 * Removes existing active listings scroll listener and replaces with search-specific scroll.
 *
 * @param {Event} event - Form submission event
 * @param {number} [page=1] - The page number to fetch listings from for pagination
 *
 * @throws {Error} When search API call fails or no listings match the search query
 *
 * @example
 * // Called when search form is submitted
 * form.addEventListener('submit', searchListingsFormHandler);
 *
 * @example
 * // Called programmatically for pagination
 * searchListingsFormHandler(event, 2);
 */

export async function searchListingsFormHandler(event, page = 1) {
  event.preventDefault();
  window.removeEventListener("scroll", activeListingsInfiniteScroll);

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#search-button");

  const listingsLoader = document.querySelector("#listings-loader");
  const listingsContainer = document.querySelector("#listings-container");
  listingsContainer.replaceChildren();
  listingsLoader.classList.remove("hidden");

  const messageContainer = document.querySelector("#messageContainer");
  if (!messageContainer.classList.contains("hidden"))
    messageContainer.classList.add("hidden");

  let listingsCount;

  try {
    fieldset.disabled = true;
    submitButton.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    const listings = await searchListingsApi(data, page);
    listingsCount = listings.data.length;
    listingsLoader.classList.add("hidden");
    displayListings(listings.data, listingsContainer);

    if (listingsCount === maxListings) {
      setupSearchInfiniteScroll(data);
    }
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.innerHTML = "<i class='fa fa-search'></i>";
    if (listingsCount === 0) {
      displayMessage(
        "#messageContainer",
        "error",
        `Found no listings that matches '${data.searchQuery}'.`,
      );
    }
  }
}
