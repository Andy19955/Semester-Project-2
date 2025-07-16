import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";
import { displayMessage } from "../shared/displayMessage.js";

/**
 * Displays and populates the edit listing form with existing listing data.
 * Fills form fields with listing title, description, image URL, and handles image preview.
 * Shows informational message if the auction has ended but still allows editing.
 * Sets up the form for editing an existing auction listing.
 *
 * @param {Object} listing - The listing object to display for editing.
 * @param {string} listing.title - The title of the listing.
 * @param {string} [listing.description] - The description of the listing.
 * @param {Array<Object>} [listing.media] - Array of media objects with url and alt properties.
 * @param {string} [listing.media[].url] - URL of the media item.
 * @param {string} [listing.media[].alt] - Alt text for the media item.
 * @param {string} listing.endsAt - ISO string of when the auction ends.
 *
 * @example
 * const listing = {
 *   title: "Vintage Pocket Watch",
 *   description: "Beautiful antique watch from 1920s",
 *   media: [{ url: "https://example.com/watch.jpg", alt: "Vintage watch" }],
 *   endsAt: "2025-01-15T10:00:00Z"
 * };
 * displayEditListing(listing);
 */
export function displayEditListing(listing) {
  document.title = `Edit ${listing.title} - The Auction Hub`;

  const listingImage = document.querySelector("#image-preview");
  if (listing.media && listing.media.length > 0 && listing.media[0]?.url) {
    listingImage.alt = listing.media[0]?.alt || fallBackImageAlt;
    listingImage.src = listing.media[0].url;
    listingImage.onerror = () => {
      listingImage.src = fallbackImage;
      listingImage.alt = fallBackImageAlt;
      listingImage.onerror = null;
    };
  } else {
    listingImage.alt = fallBackImageAlt;
    listingImage.src = fallbackImage;
  }

  const listingTitle = document.querySelector("#listing-title");
  listingTitle.value = listing.title;

  const listingDescription = document.querySelector("#listing-description");
  listingDescription.value = listing.description;

  const imageUrlInput = document.querySelector("#listing-image-url");
  imageUrlInput.value = listing.media?.[0]?.url || "";

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
