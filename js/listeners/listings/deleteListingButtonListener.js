import { deleteListingButtonHandler } from "../../handlers/listings/deleteListingButtonHandler.js";

/**
 * Attaches a click event listener to the delete listing button.
 *
 * This function looks for a button element with the ID "delete-listing-button" and
 * attaches a click event listener that will call the deleteListingButtonHandler
 * when the button is clicked. The handler will show the confirmation dialog and
 * set up listeners for the confirm/cancel buttons after they become visible.
 * If no button is found, the function does nothing.
 *
 * @function deleteListingButtonListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the delete button listener
 * deleteListingButtonListener();
 */
export function deleteListingButtonListener() {
  const deleteListingButton = document.querySelector("#delete-listing-button");
  if (deleteListingButton) {
    deleteListingButton.addEventListener("click", deleteListingButtonHandler);
  }
}
