/**
 * Displays the profile information in the profile editor form fields.
 * Populates form inputs with current profile data and shows the profile container.
 *
 * @param {Object} profile - The profile object containing user information.
 * @param {string} profile.name - The name of the profile.
 * @param {Object} profile.banner - The banner object containing the URL and alt text.
 * @param {string} profile.banner.url - The URL of the banner image.
 * @param {string} profile.banner.alt - The alt text for the banner image.
 * @param {Object} profile.avatar - The avatar object containing the URL and alt text.
 * @param {string} profile.avatar.url - The URL of the avatar image.
 * @param {string} [profile.bio] - The biography of the profile.
 *
 * @example
 * const profile = {
 *   name: "John Doe",
 *   banner: {
 *     url: "https://example.com/banner.jpg",
 *     alt: "John Doe's Banner"
 *   },
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

  const profileBanner = document.querySelector("#bannerUrl");
  profileBanner.value = profile.banner.url;

  const profileBannerAlt = document.querySelector("#bannerAlt");
  profileBannerAlt.value = profile.banner.alt;

  const profileAvatar = document.querySelector("#avatarUrl");
  profileAvatar.value = profile.avatar.url;

  const profileAvatarAlt = document.querySelector("#avatarAlt");
  profileAvatarAlt.value = profile.avatar.alt;

  const profileBio = document.querySelector("#bio");
  profileBio.innerText = profile.bio || "";

  const profileContainer = document.querySelector("#profile-container");
  profileContainer.classList.add("flex");
  profileContainer.classList.remove("hidden");
}
