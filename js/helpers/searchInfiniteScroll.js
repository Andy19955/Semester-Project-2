import { searchListingsApi } from "../api/listings/searchListingsApi.js";
import { displayListings } from "../ui/listings/displayListings.js";
import { displayMessage } from "../ui/shared/displayMessage.js";
import { throttle } from "./throttleFunction.js";

let currentSearchPage = 1;
let lastSearchData = null;
let isLoading = false;
let hasMoreListings = true;

/**
 * Sets up infinite scroll for search listings results.
 * Initializes pagination state and attaches scroll event listener for loading
 * additional search results when user scrolls near bottom of page.
 *
 * @param {Object} initialSearchData - The search data to use for subsequent API calls
 * @param {string} initialSearchData.searchQuery - The search query string
 *
 * @example
 * const searchData = { searchQuery: "vintage watch" };
 * setupSearchInfiniteScroll(searchData);
 */
export function setupSearchInfiniteScroll(initialSearchData) {
  currentSearchPage = 1;
  lastSearchData = initialSearchData;
  hasMoreListings = true;

  window.addEventListener("scroll", searchInfiniteScroll);
}

/**
 * Handles infinite scroll functionality for search listings results.
 * Throttled function that detects when user scrolls near bottom of page,
 * fetches next page of search results, and appends them to the listings container.
 * Manages loading states and stops when no more results are available.
 *
 * @example
 * window.addEventListener("scroll", searchInfiniteScroll);
 */
export function searchInfiniteScroll() {
  throttle(async () => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (endOfPage && !isLoading && hasMoreListings) {
      const listingsLoader = document.querySelector("#listings-loader");
      listingsLoader.classList.remove("hidden");
      isLoading = true;

      try {
        currentSearchPage++;
        const listings = await searchListingsApi(
          lastSearchData,
          currentSearchPage,
        );

        if (listings.data.length === 0) {
          hasMoreListings = false;
        } else {
          const listingsContainer = document.querySelector(
            "#listings-container",
          );
          displayListings(listings.data, listingsContainer);
        }
      } catch (error) {
        displayMessage("#messageContainer", "error", error.message);
      } finally {
        isLoading = false;
        listingsLoader.classList.add("hidden");
      }
    }
  }, 1000);
}
