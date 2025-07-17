/**
 * Handles cancel delete listing button click.
 * Re-enables the delete button and hides the confirmation dialog,
 * effectively canceling the delete operation.
 *
 * @returns {Promise<void>}
 *
 * @example
 * // Called when cancel button is clicked in delete confirmation dialog
 * cancelDeleteListingButtonHandler();
 */
export async function cancelDeleteListingButtonHandler() {
  const deleteButton = document.querySelector("#delete-listing-button");
  deleteButton.disabled = false;
  const deleteListingConfirmation = document.querySelector(
    "#delete-listing-confirmation",
  );
  deleteListingConfirmation.classList.add("hidden");
}
