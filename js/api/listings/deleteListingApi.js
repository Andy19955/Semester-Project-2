import { listingsUrl } from "../../constants/apiUrls.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Deletes an existing auction listing via API.
 *
 * @param {string} listingId - The ID of the listing to delete
 *
 * @returns {Promise<void>} Promise that resolves when deletion is successful
 * @throws {Error} Throws error if deletion fails
 *
 * @example
 * await deleteListingApi("listing-id-123");
 */
export async function deleteListingApi(listingId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  };

  const response = await fetch(`${listingsUrl}/${listingId}`, options);
  if (!response.ok) {
    throw new Error("Deleting auction listing failed.");
  }
  return;
}
