import { editListingFormApi } from "../../api/listings/editListingFormApi.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";

/**
 * Handles edit listing form submission.
 * Validates form data, processes multiple image URLs, and updates existing auction listing.
 * Shows success message after successful update without reloading the form.
 *
 * @param {Event} event - Form submission event
 * @throws {Error} When validation fails or API update fails
 *
 * @example
 * form.addEventListener('submit', editListingFormHandler);
 */
export async function editListingFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const imageUrls = formData
    .getAll("imageUrl")
    .filter((url) => url.trim() !== "");

  const imageAlts = formData.getAll("imageAlt");

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-edit-listing-form");
  const originalButtonText = submitButton.textContent;

  if (!data.title || !data.description) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please fill in all required fields.",
    );
    return;
  }

  if (imageUrls.length === 0) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please add at least one image URL.",
    );
    return;
  }

  if (imageUrls.length > 0) {
    data.media = imageUrls.map((url, index) => ({
      url: url,
      alt: imageAlts[index] || `${data.title} listing image ${index + 1}`,
    }));
  }

  const listingId = getQueryParam("id");

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Saving...";

    await editListingFormApi(listingId, data);
    displayMessage(
      "#messageContainer",
      "success",
      "Auction listing saved successfully!",
    );
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
