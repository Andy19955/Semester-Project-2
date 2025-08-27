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
  inputGroup.className =
    "image-url-input-group flex flex-col md:flex-row gap-2 md:items-end";

  const urlGroup = document.createElement("div");
  urlGroup.className = "flex flex-col gap-2 flex-1";
  const urlLabel = document.createElement("label");
  urlLabel.textContent = "Image URL";
  urlLabel.className = "font-semibold";
  urlLabel.htmlFor = "image-url-" + Math.random().toString(36).slice(2, 10);
  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.name = "imageUrl";
  urlInput.placeholder = "Enter image URL";
  urlInput.className =
    "flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  urlInput.id = urlLabel.htmlFor;
  urlGroup.appendChild(urlLabel);
  urlGroup.appendChild(urlInput);

  const altGroup = document.createElement("div");
  altGroup.className = "flex flex-col gap-2 flex-1";
  const altLabel = document.createElement("label");
  altLabel.textContent = "Image Alt";
  altLabel.className = "font-semibold";
  altLabel.htmlFor = "image-alt-" + Math.random().toString(36).slice(2, 10);
  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.name = "imageAlt";
  altInput.placeholder = "Enter image alt text";
  altInput.className =
    "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  altInput.id = altLabel.htmlFor;
  altGroup.appendChild(altLabel);
  altGroup.appendChild(altInput);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className =
    "remove-image-btn text-black px-3 py-2 rounded-lg hover:text-red-600 transition duration-200";
  removeBtn.setAttribute("aria-label", "Remove image");

  const icon = document.createElement("i");
  icon.className = "fa fa-trash";
  removeBtn.appendChild(icon);

  inputGroup.appendChild(urlGroup);
  inputGroup.appendChild(altGroup);
  inputGroup.appendChild(removeBtn);

  if (onInputChange) {
    urlInput.addEventListener("input", onInputChange);
  }

  if (onRemove) {
    removeBtn.addEventListener("click", () => onRemove(inputGroup));
  }

  return inputGroup;
}
