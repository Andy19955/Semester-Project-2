/**
 * Creates a new image URL input field with remove button functionality.
 * Each input field includes event listeners for URL changes and removal actions.
 *
 * @param {Object} options - Configuration options for the input field
 * @param {Function} options.onInputChange - Callback function for input change events
 * @param {Function} options.onRemove - Callback function for remove button clicks
 * @returns {HTMLElement} The newly created input group element with input field and remove button
 */
export function createImageInput({ onInputChange, onRemove }) {
  const inputGroup = document.createElement("div");
  inputGroup.className = "image-url-input-group flex gap-2";

  const input = document.createElement("input");
  input.type = "url";
  input.name = "imageUrl";
  input.placeholder = "Enter image URL";
  input.className =
    "flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className =
    "remove-image-btn text-black px-3 py-2 rounded-lg hover:text-red-600 transition duration-200";
  removeBtn.setAttribute("aria-label", "Remove image");

  const icon = document.createElement("i");
  icon.className = "fa fa-trash";
  removeBtn.appendChild(icon);

  inputGroup.appendChild(input);
  inputGroup.appendChild(removeBtn);

  if (onInputChange) {
    input.addEventListener("input", onInputChange);
  }

  if (onRemove) {
    removeBtn.addEventListener("click", () => onRemove(inputGroup));
  }

  return inputGroup;
}
