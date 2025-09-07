import { fetchProfileListings } from "../../api/profiles/fetchProfileListings.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { displayListings } from "../../ui/listings/displayListings.js";
import { setupProfileInfiniteScroll } from "../../helpers/profileInfiniteScroll.js";

/**
 * Handles fetching and displaying profile listings with custom sorting, and sets up infinite scroll.
 * Sorts listings into two groups: active auctions (ending earliest first) and ended auctions (latest ended first).
 * Active auctions are displayed before ended auctions. Manages loading states, error handling,
 * and displays appropriate messages for empty results.
 *
 * @param {string} name - The name of the profile to fetch listings for.
 * @param {number} page - The page number to fetch listings from.
 * @returns {Promise<void>}
 * @throws {Error} When listings fetch fails or API returns an error
 *
 * @example
 * profileListingsHandler("JohnDoe", 1);
 */
export async function profileListingsHandler(name, page) {
  const listingsContainer = document.querySelector("#listings-container");
  const listingsLoader = document.querySelector("#listings-loader");
  const noListingsContainer = document.querySelector("#no-listings-container");

  let listingsCount = 0;
  let isLastPage = true;

  try {
    const listings = await fetchProfileListings(name, page);
    listingsCount = listings.data.length;

    listingsLoader?.classList.add("hidden");
    isLastPage = listings.meta.isLastPage;

    if (listingsCount > 0) {
      const currentTime = new Date();
      const sortedListings = [...listings.data].sort((a, b) => {
        const aEndTime = new Date(a.endsAt);
        const bEndTime = new Date(b.endsAt);
        const aIsActive = aEndTime > currentTime;
        const bIsActive = bEndTime > currentTime;

        if (aIsActive && !bIsActive) return -1;
        if (!aIsActive && bIsActive) return 1;

        if (aIsActive && bIsActive) {
          return aEndTime - bEndTime;
        }

        if (!aIsActive && !bIsActive) {
          return bEndTime - aEndTime;
        }

        return 0;
      });

      displayListings(sortedListings, listingsContainer);
      window.addEventListener("scroll", () => {
        setupProfileInfiniteScroll(name, isLastPage);
      });
    } else {
      noListingsContainer.classList.remove("hidden");
    }
  } catch (error) {
    listingsLoader?.classList.add("hidden");
    displayMessage("#messageContainer", "error", error.message);

    noListingsContainer.classList.remove("hidden");
  }
}
