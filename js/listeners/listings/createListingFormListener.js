import { createListingFormHandler } from "../../handlers/listings/createListingFormHandler.js";

/**
 * Attaches a submit event listener to the create listing form.
 *
 * This function looks for a form element with the ID "create-listing-form" and
 * attaches a submit event listener that will call the createListingFormHandler
 * when the form is submitted. If no form is found, the function does nothing.
 *
 * @function createListingFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the form listener
 * createListingFormListener();
 */
export function createListingFormListener() {
  const createListingForm = document.querySelector("#create-listing-form");
  if (createListingForm) {
    createListingForm.addEventListener("submit", createListingFormHandler);
  }
}
