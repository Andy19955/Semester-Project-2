import { registrationFormApi } from "../../api/auth/registrationFormApi.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";

/**
 * Handles registration form submission.
 * Validates form data, transforms avatar URL to object format, and calls registration API.
 *
 * @param {Event} event - Form submission event
 * @returns {Promise<void>}
 * @throws {Error} When required fields are missing or API call fails
 *
 * @example
 * // Attach to registration form
 * const form = document.getElementById('registration-form');
 * form.addEventListener('submit', registrationFormHandler);
 */
export async function registrationFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-registration-form");
  const originalButtonText = submitButton.textContent;

  if (!data.name || !data.email || !data.password) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please fill in all required fields.",
    );
    return;
  }

  if (data.avatarUrl) {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s profile picture`,
    };

    delete data.avatarUrl;
  }

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Creating Account...";

    await registrationFormApi(data);
    displayMessage(
      "#messageContainer",
      "success",
      "Account created successfully! Redirecting to login...",
    );
    form.reset();

    setTimeout(() => {
      window.location.href = "/login/";
    }, 2000);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
