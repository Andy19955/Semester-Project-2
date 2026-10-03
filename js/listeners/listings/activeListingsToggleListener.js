import { activeListingsHandler } from "../../handlers/listings/activeListingsHandler.js";

/**
 * Attaches the active listings toggle listener.
 *
 * @returns {void}
 */
export function activeListingsToggleListener() {
  const activeListingsToggle = document.querySelector(
    "#active-listings-toggle",
  );

  if (!activeListingsToggle) return;

  activeListingsToggle.addEventListener("change", () => {
    activeListingsHandler(40, 1, true, activeListingsToggle.checked);
  });
}
