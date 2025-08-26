import { editListingFormApi } from "../../api/listings/editListingFormApi.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";
import { imageUrlPreview } from "../../ui/listings/imageUrlPreview.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { editListingHandler } from "./editListingHandler.js";

/**
 * Handles edit listing form submission.
 * Validates form data, converts image URL to media format, and updates existing auction listing.
 * Refreshes the page content after successful edit to show updated data.
 *
 * @param {Event} event - Form submission event
 *
 * @throws {Error} Throws error if listing update fails or validation errors occur
 *
 * @example
 * form.addEventListener('submit', editListingFormHandler);
 */
export async function editListingFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-edit-listing-form");
  const originalButtonText = submitButton.textContent;

  if (!data.title || !data.description || !data.imageUrl) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please fill in all required fields.",
    );
    return;
  }

  if (data.imageUrl) {
    data.media = [
      {
        url: data.imageUrl,
        alt: `${data.title} listing image`,
      },
    ];

    delete data.imageUrl;
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
    imageUrlPreview();
    editListingHandler();
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
