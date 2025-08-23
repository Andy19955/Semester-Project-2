import { createListingFormApi } from "../../api/listings/createListingFormApi.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";

/**
 * Handles create listing form submission for auction listings.
 * Validates form data, processes image URLs, and creates a new auction listing.
 *
 * @param {Event} event - Form submission event
 * @returns {Promise<void>} Promise that resolves when submission is complete
 *
 * @example
 * form.addEventListener('submit', createListingFormHandler);
 */
export async function createListingFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const imageUrls = formData
    .getAll("imageUrl")
    .filter((url) => url.trim() !== "");

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    endsAt: formData.get("endsAt"),
  };

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-create-listing-form");
  const originalButtonText = submitButton.textContent;

  if (!data.title || !data.description || !data.endsAt) {
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

  if (data.endsAt < new Date().toISOString().slice(0, 16)) {
    displayMessage(
      "#messageContainer",
      "error",
      "Ending date must be in the future.",
    );
    return;
  }

  data.endsAt = new Date(data.endsAt).toISOString();

  if (imageUrls.length > 0) {
    data.media = imageUrls.map((url, index) => ({
      url: url,
      alt: `${data.title} listing image ${index + 1}`,
    }));
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

    const mainImagePreview = document.querySelector("#main-image-preview");
    const thumbnailsContainer = document.querySelector("#image-thumbnails");

    mainImagePreview.src = "/images/no-image.jpg";
    mainImagePreview.alt = "Gray circle with text 'No image'";
    thumbnailsContainer.style.display = "none";
    thumbnailsContainer.innerHTML = "";

    const imageContainer = document.querySelector("#image-url-container");
    const inputGroups = imageContainer.querySelectorAll(
      ".image-url-input-group",
    );

    for (let i = 1; i < inputGroups.length; i++) {
      inputGroups[i].remove();
    }

    const firstRemoveBtn = imageContainer.querySelector(".remove-image-btn");
    firstRemoveBtn.classList.add("hidden");

    const addImageBtn = document.querySelector("#add-image-btn");
    addImageBtn.disabled = false;
    addImageBtn.classList.remove("opacity-50", "cursor-not-allowed");
    addImageBtn.innerHTML = '<i class="fa fa-plus"></i> Add another image';
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
