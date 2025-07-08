/**
 * Displays a single auction listing on the listing detail page.
 * Populates listing image, title, description, end date, bid count, and current highest bid.
 * Sets minimum bid amount for the bidding form and handles proper grammar for credit/credits.
 * Shows or hides UI elements based on whether bids exist.
 *
 * @param {Object} listing - The listing object to display.
 * @param {string} listing.title - The title of the listing.
 * @param {string} [listing.description] - The description of the listing.
 * @param {Array<Object>} listing.media - Array of media objects with url and alt properties.
 * @param {string} listing.media[].url - URL of the media item.
 * @param {string} [listing.media[].alt] - Alt text for the media item.
 * @param {string} listing.endsAt - ISO string of when the auction ends.
 * @param {Object} listing._count - Object containing count statistics.
 * @param {number} listing._count.bids - Number of bids placed on the listing.
 * @param {Array<Object>} [listing.bids] - Array of bid objects with amount properties.
 * @param {number} listing.bids[].amount - The bid amount in credits.
 *
 * @example
 * const listing = {
 *   title: "Vintage Pocket Watch",
 *   description: "Beautiful antique watch from 1920s",
 *   media: [{ url: "https://example.com/watch.jpg", alt: "Vintage watch" }],
 *   endsAt: "2025-01-15T10:00:00Z",
 *   _count: { bids: 5 },
 *   bids: [{ amount: 100 }, { amount: 250 }, { amount: 180 }]
 * };
 * displaySingleListing(listing);
 */
export function displaySingleListing(listing) {
  document.title = `${listing.title} - The Auction Hub`;

  const listingImage = document.querySelector("#listing-image");
  listingImage.src = listing.media[0].url;
  listingImage.setAttribute("alt", listing.media[0].alt || "Listing image");

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

  if (listing.bids && listing.bids.length > 0) {
    const highestBid = listing.bids.reduce(
      (max, bid) => (bid.amount > max ? bid.amount : max),
      0,
    );

    let creditsEnding = "credits";
    if (highestBid === 1) {
      creditsEnding = "credit";
    }

    const currentBidElement = document.querySelector("#listing-current-bid");
    currentBidElement.textContent = `${highestBid} ${creditsEnding}`;

    const listingHighestBidContainer = document.querySelector(
      "#listing-highest-bid",
    );
    listingHighestBidContainer.classList.remove("hidden");

    const bidAmountInput = document.querySelector("#bid-amount");
    bidAmountInput.setAttribute("min", highestBid + 1);

    const minimumBidAmountInfo = document.querySelector("#minimum-bid-amount");
    minimumBidAmountInfo.textContent = `${highestBid + 1} credits`;
  }
}
