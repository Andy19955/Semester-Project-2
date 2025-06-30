import { logoutButtonHandler } from "../../handlers/auth/logoutButtonHandler.js";

/**
 * Attaches a submit event listener to the logout button.
 *
 * This function looks for a button element with the ID "logout-button" and
 * attaches a click event listener that will call the logoutButtonHandler
 * when the button is clicked. If no button is found, the function does nothing.
 *
 * @function logoutButtonListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the button listener
 * logoutButtonListener();
 */
export function logoutButtonListener() {
  const logoutButton = document.querySelector("#logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", logoutButtonHandler);
  }
}
