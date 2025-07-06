import { getToken } from "./storage.js";

/**
 * Checks if the user is currently logged in.
 *
 * @returns {boolean} True if user has a valid token, false otherwise
 *
 * @example
 * if (isLoggedIn()) {
 *   // Show authenticated content
 * } else {
 *   // Redirect to login
 * }
 */
export function isLoggedIn() {
  const token = getToken();
  return token !== null && token !== "";
}

/**
 * Redirects to login page if user is not authenticated.
 *
 * @param {string} [redirectPath="/login/"] - Path to redirect to if not logged in
 *
 * @example
 * // Protect a page - call this at the top of protected pages
 * requireAuth();
 *
 * // Or redirect to a custom login page
 * requireAuth("/auth/login/");
 */
export function requireAuth(redirectPath = "/login/") {
  if (!isLoggedIn()) {
    window.location.href = redirectPath;
  }
}

/**
 * Updates the UI based on authentication status.
 * Shows/hides login/logout buttons and user-specific content.
 *
 * @example
 * // Call this on page load to update menu
 * updateAuthUI();
 */
export function updateAuthUI() {
  const loggedIn = isLoggedIn();

  const authedElements = document.querySelectorAll(".authed-element");
  authedElements.forEach((authedElement) => {
    authedElement.classList.toggle("hidden", !loggedIn);
  });

  const nonAuthElements = document.querySelectorAll(".non-authed-element");
  nonAuthElements.forEach((nonAuthedElement) => {
    nonAuthedElement.classList.toggle("hidden", loggedIn);
  });
}

/**
 * Redirects logged-in users away from auth pages (login/register).
 *
 * @param {string} [redirectPath="/profile/"] - Path to redirect to if already logged in
 *
 * @example
 * // Call this on login/register pages
 * redirectIfLoggedIn();
 */
export function redirectIfLoggedIn(redirectPath = "/profile/") {
  if (isLoggedIn()) {
    window.location.href = redirectPath;
  }
}
