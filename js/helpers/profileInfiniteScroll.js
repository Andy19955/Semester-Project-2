import { fetchProfileListings } from "../api/profiles/fetchProfileListings.js";
import { displayListings } from "../ui/listings/displayListings.js";
import { displayMessage } from "../ui/shared/displayMessage.js";
import { throttle } from "./throttleFunction.js";

let currentListingsPage = 1;
let lastName = null;
let isLoading = false;
let hasMoreListings = true;

/**
 * Sets up infinite scroll for profile listings.
 *
 * @param {string} initialName - The name of the profile to fetch listings for.
 * @param {boolean} isLastPage - Indicates if the current page is the last page of listings.
 *
 * @example
 * setupProfileInfiniteScroll("JohnDoe", false);
 */
export function setupProfileInfiniteScroll(initialName, isLastPage) {
  currentListingsPage = 1;
  lastName = initialName;
  hasMoreListings = true;

  if (isLastPage === false) {
    window.addEventListener("scroll", profileInfiniteScroll);
  }
}

/**
 * Handles the infinite scroll functionality for profile listings.
 *
 * @example
 * window.addEventListener("scroll", profileInfiniteScroll);
 */
export function profileInfiniteScroll() {
  throttle(async () => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (endOfPage && !isLoading && hasMoreListings) {
      const listingsLoader = document.querySelector("#listings-loader");
      listingsLoader.classList.remove("hidden");
      isLoading = true;

      try {
        currentListingsPage++;
        const listings = await fetchProfileListings(
          lastName,
          currentListingsPage,
        );

        if (listings.data.length === 0) {
          hasMoreListings = false;
        } else {
          const listingsContainer = document.querySelector(
            "#listings-container",
          );
          displayListings(listings, listingsContainer);
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
