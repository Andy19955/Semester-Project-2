import { logoutButtonHandler } from "../../handlers/auth/logoutButtonHandler.js";

/**
 * Attaches a submit event listener to all logout buttons.
 *
 * This function looks for button elements with the class "logout-button" and
 * attaches a click event listener that will call the logoutButtonHandler
 * when any button is clicked. Handles both desktop and mobile logout buttons.
 *
 * @function logoutButtonListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the button listeners
 * logoutButtonListener();
 */
export function logoutButtonListener() {
  const logoutButtons = document.querySelectorAll(".logout-button");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", logoutButtonHandler);
  });
}
