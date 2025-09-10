const tokenKey = "token";
const nameKey = "name";

/**
 * Saves the token to local storage.
 *
 * @param {string} token - The token to save.
 *
 * @example
 * saveToken("your-token-here");
 */
export function saveToken(token) {
  localStorage.setItem(tokenKey, token);
}

/**
 * Retrieves the token from local storage.
 *
 * @returns {string|null} - The token from local storage, or null if not found.
 *
 * @example
 * const token = getToken();
 */
export function getToken() {
  return localStorage.getItem(tokenKey);
}

/**
 * Saves the name to local storage.
 *
 * @param {string} name - The name to save.
 *
 * @example
 * saveName("John Doe");
 */
export function saveName(name) {
  localStorage.setItem(nameKey, name);
}

/**
 * Retrieves the name from local storage.
 *
 * @returns {string|null} - The name from local storage, or null if not found.
 *
 * @example
 * const name = getName();
 */
export function getName() {
  return localStorage.getItem(nameKey);
}

/**
 * Clears the token and name from local storage.
 *
 * @example
 * clearStorage();
 */
export function clearStorage() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(nameKey);
}
