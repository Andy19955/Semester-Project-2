import { confirmDeleteListingButtonListener } from "../../listeners/listings/confirmDeleteListingButtonListener.js";

/**
 * Handles delete listing button click.
 * Disables the delete button, shows the confirmation dialog, and sets up
 * listeners for the confirm and cancel buttons that become visible.
 *
 * @returns {Promise<void>}
 *
 * @example
 * // Called when delete button is clicked
 * deleteListingButtonHandler();
 */
export async function deleteListingButtonHandler() {
  const deleteButton = document.querySelector("#delete-listing-button");
  deleteButton.disabled = true;
  const deleteListingConfirmation = document.querySelector(
    "#delete-listing-confirmation",
  );
  deleteListingConfirmation.classList.remove("hidden");

  confirmDeleteListingButtonListener();
}
