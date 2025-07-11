import { biddingFormApi } from "../../api/listings/biddingFormApi.js";
import { getQueryParam } from "../../helpers/getQueryParam.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchSingleListing } from "../../api/listings/fetchSingleListing.js";

/**
 * Handles bidding form submission.
 * Validates form data, checks against current highest bid, and submits a new bid.
 * Converts amount to number, fetches current listing data for validation,
 * and reloads the page on successful bid submission.
 *
 * @param {Event} event - Form submission event
 *
 * @throws {Error} Throws error if bid submission fails or validation errors occur
 *
 * @example
 * form.addEventListener('submit', biddingFormHandler);
 */
export async function biddingFormHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.amount = Number(data.amount);

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("#submit-bid-form");
  const originalButtonText = submitButton.textContent;

  const listingId = getQueryParam("id");
  if (!listingId) {
    displayMessage(
      "#messageContainer",
      "error",
      "An error occured. Please try again.",
    );
    return;
  }

  if (!data.amount || data.amount < 1) {
    displayMessage(
      "#messageContainer",
      "error",
      "Please enter a bid amount greater than zero.",
    );
    return;
  }

  try {
    fieldset.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML =
      "<i class='fa fa-spinner fa-spin mr-2'></i>Submitting Bid...";

    const listingResponse = await fetchSingleListing(listingId);

    let highestBid = 0;
    if (listingResponse.data.bids && listingResponse.data.bids.length > 0) {
      highestBid = listingResponse.data.bids.reduce(
        (max, bid) => (bid.amount > max ? bid.amount : max),
        0,
      );
    }

    if (data.amount <= highestBid) {
      displayMessage(
        "#messageContainer",
        "error",
        `Your bid must be higher than the current highest bid of ${highestBid} ${highestBid === 1 ? "credit" : "credits"}.`,
      );
      return;
    }

    await biddingFormApi(listingId, data);
    window.location.reload();
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}
