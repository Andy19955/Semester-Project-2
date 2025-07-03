/**
 * Displays the profile information in the profile editor form fields.
 * Populates form inputs with current profile data and shows the profile container.
 *
 * @param {Object} profile - The profile object containing user information.
 * @param {string} profile.name - The name of the profile.
 * @param {Object} profile.avatar - The avatar object containing the URL and alt text.
 * @param {string} profile.avatar.url - The URL of the avatar image.
 * @param {string} [profile.bio] - The biography of the profile.
 *
 * @example
 * const profile = {
 *   name: "John Doe",
 *   avatar: {
 *     url: "https://example.com/avatar.jpg",
 *     alt: "John Doe's Avatar"
 *   },
 *   bio: "Web developer and tech enthusiast."
 * };
 * displayProfileEditor(profile);
 */

export function displayProfileEditor(profile) {
  const profileName = document.querySelector("#profile-name");
  profileName.innerText = profile.name;

  const profileAvatar = document.querySelector("#avatarUrl");
  profileAvatar.value = profile.avatar.url;

  const profileBio = document.querySelector("#bio");
  profileBio.innerText = profile.bio || "";

  const profileContainer = document.querySelector("#profile-container");
  profileContainer.classList.add("flex");
  profileContainer.classList.remove("hidden");
}
