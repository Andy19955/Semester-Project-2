import { listingsUrl } from "../../constants/apiUrls.js";

/**
 * Fetches a single auction listing from the API by its ID.
 * Includes bid data in the response for displaying current bids and bid count.
 *
 * @param {string} listingId - The unique ID of the listing to fetch
 * @returns {Promise<Object>} Single listing response from API containing listing data and bids
 * @throws {Error} When listing fetch fails or API returns error
 *
 * @example
 * // Fetch a specific listing by ID
 * const listing = await fetchSingleListing("abc123");
 * console.log(listing.data); // Single listing object
 * console.log(listing.data.bids); // Array of bids for this listing
 *
 * @example
 * // Usage in listing detail page
 * const listingId = getQueryParam("id");
 * const response = await fetchSingleListing(listingId);
 * displaySingleListing(response.data);
 */
export async function fetchSingleListing(listingId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${listingsUrl}/${listingId}?_seller=true&_bids=true`,
    options,
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listing failed.");
  }
  return json;
}
