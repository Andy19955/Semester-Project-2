/**
 * Retrieves the value of a query parameter from the URL.
 *
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string|null} - The value of the query parameter, or null if not found.
 *
 * @example
 * // URL: https://example.com/?id=123
 * const id = getQueryParam("id");
 * console.log(id); // Output: "123"
 */
export function getQueryParam(param) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(param);
  return value;
}
