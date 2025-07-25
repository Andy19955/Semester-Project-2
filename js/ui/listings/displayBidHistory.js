import { isLoggedIn } from "../../helpers/authStatus.js";
import { createBidElement } from "./createBidElement.js";

/**
 * Displays the bid history for a listing.
 * Shows bids sorted by amount (highest first) and handles authentication state.
 *
 * @param {Array<Object>} bids - Array of bid objects with amount and bidder properties.
 */
export function displayBidHistory(bids) {
  const bidsLoader = document.querySelector("#bids-loader");
  const bidsList = document.querySelector("#bids-list");
  const noBidsMessage = document.querySelector("#no-bids-message");
  const bidsNonAuthedMessage = document.querySelector(
    "#bids-non-authed-message",
  );

  bidsLoader.classList.add("hidden");

  if (isLoggedIn()) {
    if (!bids || bids.length === 0) {
      noBidsMessage.classList.remove("hidden");
      bidsList.classList.add("hidden");
      return;
    }

    const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

    bidsList.innerHTML = "";

    sortedBids.forEach((bid, index) => {
      const bidElement = createBidElement(bid, index, sortedBids);
      bidsList.append(bidElement);
      console.log(bidElement);
    });

    bidsList.classList.remove("hidden");
    noBidsMessage.classList.add("hidden");
  } else {
    bidsNonAuthedMessage.classList.remove("hidden");
  }
}
