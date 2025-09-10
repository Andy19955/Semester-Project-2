import { loginFormApi } from "../../api/auth/loginFormApi.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { saveToken, saveName } from "../../helpers/storage.js";

/**
 * Handles login form submission.
 * Validates form data, authenticates user, stores tokens and API key, then redirects to profile.
 *
 * @param {Event} event - Form submission event
 * @returns {Promise<void>}
 * @throws {Error} When required fields are missing, API calls fail, or token storage fails
 *
 * @example
 * // Attach to login form
 * const form = document.querySelector('#login-form');
 * form.addEventListener('submit', loginFormHandler);
 */
export async function loginFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-login-form");
  const originalButtonText = submitButton.textContent;

  if (!data.email || !data.password) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please fill in all required fields.",
    );
    return;
  }

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Logging in...";

    const loginResponse = await loginFormApi(data);
    saveToken(loginResponse.data.accessToken);
    saveName(loginResponse.data.name);

    window.location.href = "/profile/";
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
