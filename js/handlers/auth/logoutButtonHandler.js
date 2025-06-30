import { clearStorage } from "../helpers/storage.js";

/**
 * Handles logout button click.
 * Clears stored user data and redirects to home page.
 *
 * @example
 * // Attach to logout button
 * const button = document.getElementById('logout-button');
 * button.addEventListener('click', logoutButtonHandler);
 */
export async function logoutButtonHandler() {
  const logoutButton = document.querySelector("#logout-button");

  logoutButton.disabled = true;
  clearStorage();
  window.location.href = "/";
}
