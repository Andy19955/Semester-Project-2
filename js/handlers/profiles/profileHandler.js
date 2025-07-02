import { getName } from "../../helpers/storage.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchProfile } from "../../api/profiles/fetchProfile.js";
import { displayProfile } from "../../ui/profiles/displayProfile.js";
import { profileListingsHandler } from "./profileListingsHandler.js";

/**
 * Handles fetching and displaying the profile and the user's auction listings.
 *
 * @example
 * profileHandler();
 */
export async function profileHandler() {
  const profileLoader = document.querySelector("#profile-loader");
  const name = getName();

  try {
    const profile = await fetchProfile(name);
    displayProfile(profile.data);
    profileListingsHandler(name, 1);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    profileLoader.classList.add("hidden");
  }
}
