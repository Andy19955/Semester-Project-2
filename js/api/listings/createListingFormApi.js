import { listingsUrl } from "../../constants/apiUrls.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Creates a new auction listing via API.
 *
 * @param {Object} listingData - Listing data to create
 * @param {string} listingData.title - The title of the listing
 * @param {string} listingData.description - The description of the listing
 * @param {string} listingData.endsAt - ISO string of when the auction ends
 * @param {Object} [listingData.media] - Media object with url and alt properties
 * @param {string} listingData.media.url - URL of the listing image
 * @param {string} listingData.media.alt - Alt text for the listing image
 *
 * @example
 * const listingData = {
 *   title: "Vintage Watch",
 *   description: "Beautiful antique watch",
 *   endsAt: "2025-01-15T10:00:00Z",
 *   media: { url: "image.jpg", alt: "Watch image" }
 * };
 * await createListingFormApi(listingData);
 */
export async function createListingFormApi(listingData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(listingData),
  };

  const response = await fetch(listingsUrl, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Create auction listing failed.",
    );
  }
  return json;
}
