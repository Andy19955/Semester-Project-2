import { searchListingsFormHandler } from "../../handlers/listings/searchListingsFormHandler.js";

/**
 * Attaches a submit event listener to the search listings form.
 *
 * This function looks for a form element with the ID "search-form" and
 * attaches a submit event listener that will call the searchListingsFormHandler
 * when the form is submitted. The handler will process the search query and
 * filter/display the matching auction listings.
 * If no form is found, the function does nothing.
 *
 * @function searchListingsFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the search form listener
 * searchListingsFormListener();
 */
export function searchListingsFormListener() {
  const searchForm = document.querySelector("#search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", searchListingsFormHandler);
  }
}
