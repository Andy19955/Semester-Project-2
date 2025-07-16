import { listingsUrl } from "../../constants/apiUrls.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Edits an existing auction listing via API.
 *
 * @param {string} listingId - The ID of the listing to edit
 * @param {Object} listingData - Listing data to update
 * @param {string} listingData.title - The title of the listing
 * @param {string} listingData.description - The description of the listing
 * @param {Array<Object>} [listingData.media] - Array of media objects with url and alt properties
 * @param {string} listingData.media[].url - URL of the listing image
 * @param {string} listingData.media[].alt - Alt text for the listing image
 *
 * @returns {Promise<Object>} Promise that resolves to the API response with updated listing data
 *
 * @throws {Error} Throws error if edit fails or validation errors occur
 *
 * @example
 * const listingData = {
 *   title: "Vintage Watch",
 *   description: "Beautiful antique watch",
 *   media: [{ url: "image.jpg", alt: "Watch image" }]
 * };
 * await editListingFormApi("listing-id-123", listingData);
 */
export async function editListingFormApi(listingId, listingData) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(listingData),
  };

  const response = await fetch(`${listingsUrl}/${listingId}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Edit auction listing failed.",
    );
  }
  return json;
}
