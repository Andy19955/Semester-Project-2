import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";
import { getName } from "../../helpers/storage.js";
import { displayMessage } from "../shared/displayMessage.js";

/**
 * Displays a single auction listing on the listing detail page.
 * Populates listing image, title, description, end date, bid count, and current highest bid.
 * Sets minimum bid amount for the bidding form and handles proper grammar for credit/credits.
 * Shows or hides UI elements based on whether bids exist and user permissions.
 * Hides bidding container if user is the seller. Displays success message if user has highest bid.
 *
 * @param {Object} listing - The listing object to display.
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
 *
 * @example
 * const listing = {
 *   title: "Vintage Pocket Watch",
 *   description: "Beautiful antique watch from 1920s",
 *   media: [{ url: "https://example.com/watch.jpg", alt: "Vintage watch" }],
 *   endsAt: "2025-01-15T10:00:00Z",
 *   seller: { name: "john_doe" },
 *   _count: { bids: 5 },
 *   bids: [
 *     { amount: 100, bidder: { name: "alice" } },
 *     { amount: 250, bidder: { name: "bob" } }
 *   ]
 * };
 * displaySingleListing(listing);
 */
export function displaySingleListing(listing) {
  document.title = `${listing.title} - The Auction Hub`;

  const listingImage = document.querySelector("#listing-image");
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

  // Check if auction has ended
  if (endTime <= currentTime) {
    bidContainer.classList.add("hidden");
    displayMessage(
      "#messageContainer",
      "info",
      "This auction has ended. No more bids can be placed.",
    );
  } else if (listing.seller.name === getName()) {
    bidContainer.classList.add("hidden");
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
}
