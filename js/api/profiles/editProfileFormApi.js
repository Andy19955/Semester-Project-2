import { profileUrl } from "../../constants/apiUrls.js";
import { getKey } from "../../helpers/getKey.js";
import { getToken } from "../../helpers/storage.js";

/**
 * Updates user profile information via API.
 *
 * @param {Object} profileData - Profile data to update
 * @param {string} [profileData.bio] - User's biography
 * @param {Object} [profileData.banner] - User's banner information
 * @param {string} [profileData.banner.url] - URL of the banner image
 * @param {string} [profileData.banner.alt] - Alt text for the banner image
 * @param {Object} [profileData.avatar] - User's avatar information
 * @param {string} [profileData.avatar.url] - URL of the avatar image
 * @param {string} [profileData.avatar.alt] - Alt text for the avatar image
 * @param {string} name - The username/name of the profile to update
 * @returns {Promise<Object>} Updated profile data from API
 * @throws {Error} When profile update fails or API returns error
 *
 * @example
 * const profileData = {
 *   bio: "Updated bio text",
 *   banner: {
 *     url: "https://example.com/banner.jpg",
 *     alt: "User's banner"
 *   },
 *   avatar: {
 *     url: "https://example.com/avatar.jpg",
 *     alt: "User's avatar"
 *   }
 * };
 * const result = await editProfileFormApi(profileData, "johndoe");
 */
export async function editProfileFormApi(profileData, name) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": await getKey(),
    },
    body: JSON.stringify(profileData),
  };

  const response = await fetch(`${profileUrl}/${name}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed saving profile.");
  }
  return json;
}
