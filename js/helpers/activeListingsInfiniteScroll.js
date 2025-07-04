import { fetchActiveListings } from "../api/listings/fetchActiveListings.js";
import { displayListings } from "../ui/listings/displayListings.js";
import { displayMessage } from "../ui/shared/displayMessage.js";
import { throttle } from "./throttleFunction.js";

let currentListingsPage = 1;
let isLoading = false;
let hasMoreListings = true;

/**
 * Sets up infinite scroll for active listings.
 *
 * @param {boolean} isLastPage - Indicates if the current page is the last page of active listings.
 *
 * @example
 * setupActiveListingsInfiniteScroll(false);
 */
export function setupActiveListingsInfiniteScroll(isLastPage) {
  if (isLastPage === false) {
    window.addEventListener("scroll", activeListingsInfiniteScroll);
  }
}

/**
 * Handles the infinite scroll functionality for active listings.
 * Fetches additional pages of active listings when user scrolls near the bottom.
 *
 * @example
 * window.addEventListener("scroll", activeListingsInfiniteScroll);
 */
export function activeListingsInfiniteScroll() {
  throttle(async () => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (endOfPage && !isLoading && hasMoreListings) {
      const listingsLoader = document.querySelector("#listings-loader");
      listingsLoader.classList.remove("hidden");
      isLoading = true;

      try {
        currentListingsPage++;
        const listings = await fetchActiveListings(40, currentListingsPage);

        console.log(listings);
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
