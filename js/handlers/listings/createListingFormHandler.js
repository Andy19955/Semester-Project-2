import { createListingFormApi } from "../../api/listings/createListingFormApi.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";

/**
 * Handles create listing form submission.
 * Validates form data and creates new auction listing.
 *
 * @param {Event} event - Form submission event
 *
 * @example
 * form.addEventListener('submit', createListingFormHandler);
 */
export async function createListingFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-create-listing-form");
  const originalButtonText = submitButton.textContent;

  const imagePreview = document.querySelector("#image-preview");

  if (!data.title || !data.description || !data.imageUrl || !data.endsAt) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please fill in all required fields.",
    );
    return;
  }

  if (data.endingDate < new Date().toISOString().slice(0, 16)) {
    displayMessage(
      "#messageContainer",
      "error",
      "Ending date must be in the future.",
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

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Creating Auction Listing...";

    await createListingFormApi(data);
    displayMessage(
      "#messageContainer",
      "success",
      "Auction listing created successfully!",
    );
    form.reset();
    imagePreview.src = "/images/no-image.jpg";
    imagePreview.alt = "Gray circle with text 'No image'";
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
