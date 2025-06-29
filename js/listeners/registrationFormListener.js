import { registrationFormHandler } from "../handlers/auth/registrationFormHandler.js";

/**
 * Attaches a submit event listener to the registration form.
 *
 * This function looks for a form element with the ID "registration-form" and
 * attaches a submit event listener that will call the registrationFormHandler
 * when the form is submitted. If no form is found, the function does nothing.
 *
 * @function registrationFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the form listener
 * registrationFormListener();
 */
export function registrationFormListener() {
  const registrationForm = document.querySelector("#registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", registrationFormHandler);
  }
}
