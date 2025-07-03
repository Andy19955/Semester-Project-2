/**
 * Displays the profile information on the profile page.
 * Populates profile elements with user data and shows the profile container.
 *
 * @param {Object} profile - The profile object containing user information.
 * @param {string} profile.name - The name of the profile.
 * @param {Object} profile.avatar - The avatar object containing the URL and alt text.
 * @param {string} profile.avatar.url - The URL of the avatar image.
 * @param {string} profile.avatar.alt - The alt text for the avatar image.
 * @param {string} [profile.bio] - The biography of the profile.
 * @param {number} profile.credits - The number of credits the user has.
 *
 * @example
 * const profile = {
 *   name: "John Doe",
 *   avatar: {
 *     url: "https://example.com/avatar.jpg",
 *     alt: "John Doe's Avatar"
 *   },
 *   bio: "Web developer and tech enthusiast.",
 *   credits: 1000
 * };
 * displayProfile(profile);
 */

export function displayProfile(profile) {
  const profileName = document.querySelector("#profile-name");
  profileName.innerText = profile.name;

  const profileAvatar = document.querySelector("#profile-avatar");
  profileAvatar.src = profile.avatar.url;
  profileAvatar.setAttribute("alt", profile.avatar.alt);

  const profileBio = document.querySelector("#profile-bio");
  profileBio.innerText = profile.bio || "";

  const profileCredits = document.querySelector("#profile-credits");
  profileCredits.innerText = profile.credits;

  const profileContainer = document.querySelector("#profile-container");
  profileContainer.classList.add("flex");
  profileContainer.classList.remove("hidden");
}
