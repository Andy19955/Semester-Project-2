import { editListingFormHandler } from "../../handlers/listings/editListingFormHandler.js";

/**
 * Attaches a submit event listener to the edit listing form.
 *
 * This function looks for a form element with the ID "edit-listing-form" and
 * attaches a submit event listener that will call the editListingFormHandler
 * when the form is submitted. If no form is found, the function does nothing.
 *
 * @function editListingFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the form listener
 * editListingFormListener();
 */
export function editListingFormListener() {
  const editListingForm = document.querySelector("#edit-listing-form");
  if (editListingForm) {
    editListingForm.addEventListener("submit", editListingFormHandler);
  }
}
