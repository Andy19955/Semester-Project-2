import { clearStorage } from "../../helpers/storage.js";

/**
 * Handles logout button click.
 * Clears stored user data and redirects to home page.
 * Disables the clicked button during logout process.
 *
 * @param {Event} event - The click event from the logout button
 * @example
 * // Attach to logout buttons
 * const buttons = document.querySelectorAll('.logout-button');
 * buttons.forEach(button => button.addEventListener('click', logoutButtonHandler));
 */
export async function logoutButtonHandler(event) {
  const clickedButton = event.target;

  clickedButton.disabled = true;
  clearStorage();
  window.location.href = "/";
}
