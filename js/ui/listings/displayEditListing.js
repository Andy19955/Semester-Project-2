import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";
import { displayMessage } from "../shared/displayMessage.js";

/**
 * Displays and populates the edit listing form with existing listing data.
 * Sets up multiple image management, thumbnail gallery, and remove button functionality.
 *
 * @param {Object} listing - The listing object containing title, description, media, and endsAt
 * @param {string} listing.title - The title of the listing
 * @param {string} listing.description - The description of the listing
 * @param {Array<Object>} listing.media - Array of media objects with url and alt properties
 * @param {string} listing.endsAt - ISO string of when the auction ends
 *
 * @example
 * displayEditListing(listing);
 */
export function displayEditListing(listing) {
  document.title = `Edit ${listing.title} - The Auction Hub`;

  const cancelEditingLink = document.querySelector("#cancel-editing-link");
  cancelEditingLink.href = `/listing/?id=${listing.id}`;

  const listingImage = document.querySelector("#image-preview");
  const thumbnailsContainer = document.querySelector("#image-thumbnails");
  const imageContainer = document.querySelector("#image-url-container");

  if (listing.media && listing.media.length > 0 && listing.media[0]?.url) {
    listingImage.alt = listing.media[0]?.alt || fallBackImageAlt;
    listingImage.src = listing.media[0].url;
    listingImage.onerror = () => {
      listingImage.src = fallbackImage;
      listingImage.alt = fallBackImageAlt;
      listingImage.onerror = null;
    };

    if (listing.media.length > 1) {
      thumbnailsContainer.style.display = "grid";
      thumbnailsContainer.innerHTML = "";

      listing.media.forEach((media, index) => {
        if (media?.url) {
          const thumbnail = document.createElement("div");
          thumbnail.className = `relative cursor-pointer border-2 rounded-lg ${
            index === 0
              ? "border-blue-500"
              : "border-gray-200 hover:border-blue-300"
          }`;

          const img = document.createElement("img");
          img.src = media.url;
          img.alt = media.alt || `${listing.title} image ${index + 1}`;
          img.className = "w-full h-16 object-cover";
          img.onerror = function () {
            this.src = fallbackImage;
          };

          thumbnail.appendChild(img);

          thumbnail.addEventListener("click", () => {
            listingImage.src = media.url;
            listingImage.alt =
              media.alt || `${listing.title} image ${index + 1}`;

            thumbnailsContainer
              .querySelectorAll(".border-blue-500")
              .forEach((el) => {
                el.className = el.className.replace(
                  "border-blue-500",
                  "border-gray-200 hover:border-blue-300",
                );
              });
            thumbnail.className = `relative cursor-pointer border-2 rounded-lg border-blue-500`;
          });

          thumbnailsContainer.appendChild(thumbnail);
        }
      });
    } else {
      thumbnailsContainer.style.display = "none";
    }

    const firstInputUrl = imageContainer.querySelector(
      "input[name='imageUrl']",
    );
    firstInputUrl.value = listing.media[0]?.url || "";

    const firstInputAlt = imageContainer.querySelector(
      "input[name='imageAlt']",
    );
    firstInputAlt.value = listing.media[0]?.alt || "";

    listing.media.slice(1).forEach((media) => {
      if (media?.url) {
        const inputGroup = document.createElement("div");
        inputGroup.className =
          "image-url-input-group flex flex-col md:flex-row gap-2 md:items-end";

        const urlGroup = document.createElement("div");
        urlGroup.className = "flex flex-col gap-2 flex-1";
        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Image URL";
        urlLabel.className = "font-semibold";
        urlLabel.htmlFor =
          "image-url-" + Math.random().toString(36).slice(2, 10);
        const urlInput = document.createElement("input");
        urlInput.type = "url";
        urlInput.name = "imageUrl";
        urlInput.placeholder = "Enter image URL";
        urlInput.className =
          "flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
        urlInput.id = urlLabel.htmlFor;
        urlInput.value = media.url;
        urlGroup.appendChild(urlLabel);
        urlGroup.appendChild(urlInput);

        const altGroup = document.createElement("div");
        altGroup.className = "flex flex-col gap-2 flex-1";
        const altLabel = document.createElement("label");
        altLabel.textContent = "Image Alt";
        altLabel.className = "font-semibold";
        altLabel.htmlFor =
          "image-alt-" + Math.random().toString(36).slice(2, 10);
        const altInput = document.createElement("input");
        altInput.type = "text";
        altInput.name = "imageAlt";
        altInput.placeholder = "Enter image alt text";
        altInput.className =
          "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
        altInput.id = altLabel.htmlFor;
        altInput.value = media.alt || "";
        altGroup.appendChild(altLabel);
        altGroup.appendChild(altInput);

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className =
          "remove-image-btn text-black px-3 py-2 rounded-lg hover:text-red-600 transition duration-200";
        removeBtn.setAttribute("aria-label", "Remove image");

        const icon = document.createElement("i");
        icon.className = "fa fa-trash";
        removeBtn.appendChild(icon);

        inputGroup.appendChild(urlGroup);
        inputGroup.appendChild(altGroup);
        inputGroup.appendChild(removeBtn);
        imageContainer.appendChild(inputGroup);
      }
    });
  } else {
    listingImage.alt = fallBackImageAlt;
    listingImage.src = fallbackImage;
    thumbnailsContainer.style.display = "none";
  }

  const listingTitle = document.querySelector("#listing-title");
  listingTitle.value = listing.title;

  const listingDescription = document.querySelector("#listing-description");
  listingDescription.value = listing.description;

  const currentTime = new Date();
  const endTime = new Date(listing.endsAt);

  if (endTime <= currentTime) {
    displayMessage(
      "#messageContainer",
      "info",
      "This auction has ended. You can edit, but no more bids can be placed.",
    );
  }
}
