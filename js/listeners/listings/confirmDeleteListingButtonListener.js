import { confirmDeleteListingButtonHandler } from "../../handlers/listings/confirmDeleteListingButtonHandler.js";
import { cancelDeleteListingButtonHandler } from "../../handlers/listings/cancelDeleteListingButtonHandler.js";

/**
 * Attaches click event listeners to the confirm and cancel delete buttons.
 *
 * This function looks for confirm and cancel delete buttons in the confirmation dialog
 * and attaches click event listeners to handle deletion confirmation or cancellation.
 * Called after the delete confirmation dialog becomes visible.
 * If any button is not found, that specific listener is skipped.
 *
 * @function confirmDeleteListingButtonListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Called after showing the delete confirmation dialog
 * confirmDeleteListingButtonListener();
 */
export function confirmDeleteListingButtonListener() {
  const confirmDeleteListingButton = document.querySelector(
    "#confirm-delete-listing-button",
  );
  if (confirmDeleteListingButton) {
    confirmDeleteListingButton.addEventListener(
      "click",
      confirmDeleteListingButtonHandler,
    );
  }

  const cancelDeleteListingButton = document.querySelector(
    "#cancel-delete-listing-button",
  );
  if (cancelDeleteListingButton) {
    cancelDeleteListingButton.addEventListener(
      "click",
      cancelDeleteListingButtonHandler,
    );
  }
}
