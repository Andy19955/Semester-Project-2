import { biddingFormHandler } from "../../handlers/listings/biddingFormHandler.js";

/**
 * Attaches a submit event listener to the bidding form.
 *
 * Looks for a form element with the ID "bidding-form" and
 * attaches a submit event listener that calls the biddingFormHandler.
 * The handler will validate the bid and submit it to the API.
 * If no form is found, the function does nothing.
 *
 * @function biddingFormListener
 * @returns {void}
 *
 * @see {@link biddingFormHandler} - The handler that processes bid submissions
 *
 * @example
 * // Call this function to set up the form listener
 * biddingFormListener();
 */
export function biddingFormListener() {
  const biddingForm = document.querySelector("#bidding-form");
  if (biddingForm) {
    biddingForm.addEventListener("submit", biddingFormHandler);
  }
}
