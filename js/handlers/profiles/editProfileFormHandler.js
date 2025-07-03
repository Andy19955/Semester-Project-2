import { editProfileFormApi } from "../../api/profiles/editProfileFormApi.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { getName } from "../../helpers/storage.js";

/**
 * Handles edit profile form submission.
 * Extracts form data, transforms avatar URL data, and calls the API to update the profile.
 * Provides visual feedback during the submission process.
 *
 * @param {Event} event - Form submission event
 * @returns {Promise<void>}
 * @throws {Error} When API call fails or profile update encounters an error
 *
 * @example
 * // Attach to edit profile form
 * const form = document.getElementById('edit-profile-form');
 * form.addEventListener('submit', editProfileFormHandler);
 */
export async function editProfileFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-edit-profile-form");
  const originalButtonText = submitButton.textContent;

  const name = getName();

  if (data.avatarUrl) {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${name}'s profile picture`,
    };

    delete data.avatarUrl;
  }

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Saving profile...";

    await editProfileFormApi(data, name);

    window.location.href = "../";
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
