import { getName } from "../../helpers/storage.js";
import { displayMessage } from "../../ui/shared/displayMessage.js";
import { fetchProfile } from "../../api/profiles/fetchProfile.js";
import { displayProfileEditor } from "../../ui/profiles/displayProfileEditor.js";

/**
 * Handles fetching and displaying the profile information on the edit profile page.
 * Retrieves the current user's profile data and populates the edit form fields.
 * Manages loading states and error handling during the fetch process.
 *
 * @returns {Promise<void>}
 * @throws {Error} When profile fetch fails or user is not authenticated
 *
 * @example
 * // Initialize the edit profile page
 * editProfileHandler();
 */
export async function editProfileHandler() {
  const profileLoader = document.querySelector("#profile-loader");
  const name = getName();

  try {
    const profile = await fetchProfile(name);
    displayProfileEditor(profile.data);
  } catch (error) {
    displayMessage("#messageContainer", "error", error.message);
  } finally {
    profileLoader.classList.add("hidden");
  }
}
