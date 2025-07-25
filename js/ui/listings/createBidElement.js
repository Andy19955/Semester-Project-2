/**
 * Creates a bid element for display in the bid history.
 * Highlights the highest bid (index 0) and formats the timestamp.
 *
 * @param {Object} bid - The bid object with amount, bidder, and created properties.
 * @param {number} index - The bid's position in the sorted list (0 = highest).
 * @returns {HTMLDivElement} The created bid element.
 */
export function createBidElement(bid, index) {
  const bidElement = document.createElement("div");
  bidElement.className = `flex flex-col md:flex-row justify-between items-center p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
    index === 0 ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
  }`;

  const bidderInfoContainer = document.createElement("div");
  bidderInfoContainer.className =
    "flex flex-col gap-1 w-full text-center md:text-left";

  const bidderNameContainer = document.createElement("div");
  bidderNameContainer.className =
    "flex items-center gap-2 justify-center md:justify-start";

  const bidderName = document.createElement("span");
  bidderName.className = "font-medium text-gray-800";
  bidderName.textContent = bid.bidder.name;
  bidderNameContainer.append(bidderName);

  const bidDate = document.createElement("time");
  bidDate.className = "text-sm text-gray-700";
  bidDate.setAttribute("datetime", bid.created);
  bidDate.textContent = new Date(bid.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const bidAmountContainer = document.createElement("div");
  bidAmountContainer.className = "text-right";
  const bidAmount = document.createElement("span");
  bidAmount.className = "text-lg font-semibold text-gray-800";
  bidAmount.textContent = bid.amount;
  const bidAmountLabel = document.createElement("span");
  bidAmountLabel.className = "text-sm text-gray-600 ml-1";
  bidAmountLabel.textContent = bid.amount === 1 ? "credit" : "credits";
  bidAmountContainer.append(bidAmount, bidAmountLabel);

  if (index === 0) {
    const highestBidBadge = document.createElement("span");
    highestBidBadge.className =
      "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium";
    highestBidBadge.textContent = "Highest bid";
    bidderNameContainer.append(highestBidBadge);
  }

  bidderInfoContainer.append(bidderNameContainer, bidDate);
  bidElement.append(bidderInfoContainer, bidAmountContainer);
  return bidElement;
}
