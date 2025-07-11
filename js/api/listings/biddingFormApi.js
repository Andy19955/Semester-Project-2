import { listingsUrl } from "../../constants/apiUrls.js";
import { getApiKey, getToken } from "../../helpers/storage.js";

/**
 * Submits a bid for an auction listing via API.
 *
 * @param {string} listingId - The ID of the listing to bid on
 * @param {Object} data - Bid data to submit
 * @param {number} data.amount - The bid amount in credits
 *
 * @returns {Promise<Object>} Promise that resolves to the API response with bid data
 *
 * @throws {Error} Throws error if bid submission fails or validation errors occur
 *
 * @example
 * const bidData = {
 *   amount: 150
 * };
 * await biddingFormApi("listing-id-123", bidData);
 */
export async function biddingFormApi(listingId, data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${listingsUrl}/${listingId}/bids`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Submitting bid failed.");
  }
  return json;
}
