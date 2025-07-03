import { editProfileFormHandler } from "../../handlers/profiles/editProfileFormHandler.js";

/**
 * Attaches a submit event listener to the edit profile form.
 *
 * This function looks for a form element with the ID "edit-profile-form" and
 * attaches a submit event listener that will call the editProfileFormHandler
 * when the form is submitted. If no form is found, the function does nothing.
 *
 * @function editProfileFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the form listener
 * editProfileFormListener();
 */
export function editProfileFormListener() {
  const editProfileForm = document.querySelector("#edit-profile-form");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", editProfileFormHandler);
  }
}
