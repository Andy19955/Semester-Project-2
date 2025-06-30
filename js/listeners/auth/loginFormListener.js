import { loginFormHandler } from "../../handlers/auth/loginFormHandler.js";

/**
 * Attaches a submit event listener to the login form.
 *
 * This function looks for a form element with the ID "login-form" and
 * attaches a submit event listener that will call the loginFormHandler
 * when the form is submitted. If no form is found, the function does nothing.
 *
 * @function loginFormListener
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Call this function to set up the form listener
 * loginFormListener();
 */
export function loginFormListener() {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", loginFormHandler);
  }
}
