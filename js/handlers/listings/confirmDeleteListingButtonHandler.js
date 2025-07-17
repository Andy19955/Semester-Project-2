import { getQueryParam } from "../../helpers/getQueryParam.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { deleteListingApi } from "../../api/listings/deleteListingApi.js";

/**
 * Handles confirm delete listing button click.
 * Extracts listing ID from URL query parameters, calls the delete API,
 * and redirects to profile page on success. Shows loading state during
 * deletion and handles errors appropriately.
 *
 * @returns {Promise<void>}
 * @throws {Error} When listing deletion fails or API call encounters errors
 *
 * @example
 * // Called when confirm delete button is clicked in delete confirmation dialog
 * confirmDeleteListingButtonHandler();
 */
export async function confirmDeleteListingButtonHandler() {
  const confirmDeleteButton = document.querySelector(
    "#confirm-delete-listing-button",
  );
  const originalButtonText = confirmDeleteButton.textContent;

  const listingId = getQueryParam("id");

  try {
    confirmDeleteButton.disabled = true;
    confirmDeleteButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Deleting...";

    await deleteListingApi(listingId);
    window.location.href = "/profile/";
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    confirmDeleteButton.disabled = false;
    confirmDeleteButton.innerHTML = originalButtonText;
  }
}
