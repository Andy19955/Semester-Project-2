import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";
import { getName } from "../../helpers/storage.js";
import { displayMessage } from "../shared/displayMessage.js";
import { displayBidHistory } from "./displayBidHistory.js";

/**
 * Displays a single auction listing on the listing detail page.
 * Populates main image with thumbnail gallery, title, description, end date, bid count, and current highest bid.
 * Creates interactive thumbnail gallery for multiple images with click-to-switch functionality.
 * Sets minimum bid amount for the bidding form and handles proper grammar for credit/credits.
 * Shows or hides UI elements based on whether bids exist and user permissions.
 * Hides bidding container if user is the seller. Displays success message if user has highest bid.
 *
 * @param {Object} listing - The listing object to display.
 * @param {string} listing.id - The unique ID of the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {string} [listing.description] - The description of the listing.
 * @param {Array<Object>} listing.media - Array of media objects with url and alt properties.
 * @param {string} listing.media[].url - URL of the media item.
 * @param {string} [listing.media[].alt] - Alt text for the media item.
 * @param {string} listing.endsAt - ISO string of when the auction ends.
 * @param {Object} listing.seller - The seller object with name property.
 * @param {string} listing.seller.name - The name of the seller.
 * @param {Object} listing._count - Object containing count statistics.
 * @param {number} listing._count.bids - Number of bids placed on the listing.
 * @param {Array<Object>} [listing.bids] - Array of bid objects with amount and bidder properties.
 * @param {number} listing.bids[].amount - The bid amount in credits.
 * @param {Object} listing.bids[].bidder - The bidder object with name property.
 * @param {string} listing.bids[].bidder.name - The name of the bidder.
 */
export function displaySingleListing(listing) {
  document.title = `${listing.title} - The Auction Hub`;

  const listingImage = document.querySelector("#listing-image");
  const thumbnailsContainer = document.querySelector("#image-thumbnails");

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
          thumbnail.className = `relative cursor-pointer border-2 rounded-lg overflow-hidden ${
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
            thumbnail.className = `relative cursor-pointer border-2 rounded-lg overflow-hidden border-blue-500`;
          });

          thumbnailsContainer.appendChild(thumbnail);
        }
      });
    } else {
      thumbnailsContainer.style.display = "none";
    }
  } else {
    listingImage.alt = fallBackImageAlt;
    listingImage.src = fallbackImage;
    thumbnailsContainer.style.display = "none";
  }

  const listingTitle = document.querySelector("#listing-title");
  listingTitle.textContent = listing.title;

  const listingDescription = document.querySelector("#listing-description");
  listingDescription.textContent =
    listing.description || "No description available.";

  const endDateElement = document.querySelector("#listing-end-date");
  endDateElement.textContent = new Date(listing.endsAt).toLocaleString();
  endDateElement.setAttribute("datetime", listing.endsAt);

  const bidCountElement = document.querySelector("#listing-bid-count");
  bidCountElement.textContent = listing._count.bids || 0;

  const bidContainer = document.querySelector("#bidding-container");
  const currentTime = new Date();
  const endTime = new Date(listing.endsAt);

  const editListingButton = document.querySelector("#edit-listing-button");

  if (endTime <= currentTime) {
    bidContainer.classList.add("hidden");
    displayMessage(
      "#messageContainer",
      "info",
      "This auction has ended. No more bids can be placed.",
    );
  }
  if (listing.seller.name === getName()) {
    bidContainer.classList.add("hidden");
    editListingButton.href = `./edit-listing/?id=${listing.id}`;
    editListingButton.classList.remove("hidden");
  }

  if (listing.bids && listing.bids.length > 0) {
    const highestBidObj = listing.bids.reduce(
      (max, bid) => (bid.amount > max.amount ? bid : max),
      listing.bids[0],
    );

    const currentBidElement = document.querySelector("#listing-current-bid");
    currentBidElement.textContent = `${highestBidObj.amount} ${highestBidObj.amount === 1 ? "credit" : "credits"}`;

    const listingHighestBidContainer = document.querySelector(
      "#listing-highest-bid",
    );
    listingHighestBidContainer.classList.remove("hidden");

    const bidAmountInput = document.querySelector("#bid-amount");
    bidAmountInput.setAttribute("min", highestBidObj.amount + 1);

    const minimumBidAmountInfo = document.querySelector("#minimum-bid-amount");
    minimumBidAmountInfo.textContent = `${highestBidObj.amount + 1} credits`;

    if (highestBidObj.bidder.name === getName()) {
      if (endTime <= currentTime) {
        displayMessage(
          "#messageContainer",
          "success",
          `Congratulations! You won this auction with a bid of ${highestBidObj.amount} ${highestBidObj.amount === 1 ? "credit" : "credits"}.`,
        );
      } else {
        displayMessage(
          "#messageContainer",
          "success",
          `You currently have the highest bid! Your bid of ${highestBidObj.amount} ${highestBidObj.amount === 1 ? "credit" : "credits"} is leading.`,
        );
      }
    }
  }

  displayBidHistory(listing.bids);
}
