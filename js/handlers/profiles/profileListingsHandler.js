import { fetchProfileListings } from "../../api/profiles/fetchProfileListings.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { displayListings } from "../../ui/listings/displayListings.js";
import { setupProfileInfiniteScroll } from "../../helpers/profileInfiniteScroll.js";

/**
 * Handles fetching and displaying profile posts, and sets up infinite scroll.
 *
 * @param {string} name - The name of the profile to fetch posts for.
 * @param {number} page - The page number to fetch posts from.
 *
 * @example
 * profilePostsHandler("JohnDoe", 1);
 */
export async function profileListingsHandler(name, page) {
  const listingsContainer = document.querySelector("#listings-container");
  const listingsLoader = document.querySelector("#listings-loader");

  let listingsCount = 0;
  let isLastPage = true;

  try {
    const listings = await fetchProfileListings(name, page);
    listingsCount = listings.data.length;

    listingsLoader?.classList.add("hidden");
    isLastPage = listings.meta.isLastPage;

    if (listingsCount > 0) {
      displayListings(listings.data, listingsContainer);
      // Set up infinite scroll for successful listings
      window.addEventListener("scroll", () => {
        setupProfileInfiniteScroll(name, isLastPage);
      });
    } else {
      // Show no listings message
      listingsContainer.innerHTML = "";
      listingsContainer.className =
        "flex items-center justify-center py-12 min-h-[300px]";

      const noListingsMessage = document.createElement("div");
      noListingsMessage.className = "text-center text-gray-500";
      noListingsMessage.innerHTML = `
        <i class="fa fa-inbox text-6xl mb-6 block text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
        <p class="text-gray-500">You haven't created any listings yet.</p>
      `;

      listingsContainer.appendChild(noListingsMessage);
    }
  } catch (error) {
    listingsLoader?.classList.add("hidden");
    displayMessage("#messageContainer", "error", error.message);

    // Show error state
    listingsContainer.innerHTML = "";
    listingsContainer.className =
      "flex items-center justify-center py-12 min-h-[300px]";

    const errorMessage = document.createElement("div");
    errorMessage.className = "text-center text-red-500";
    errorMessage.innerHTML = `
      <i class="fa fa-exclamation-triangle text-4xl mb-4 block"></i>
      <h3 class="text-lg font-semibold mb-2">Failed to load listings</h3>
      <p>Please try again later.</p>
    `;

    listingsContainer.appendChild(errorMessage);
  }
}
