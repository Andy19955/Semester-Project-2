/**
 * Sets up real-time image preview for the listing image URL input field.
 * Updates preview image as user types, shows fallback when empty.
 *
 * @example
 * imageUrlPreview();
 */
export function imageUrlPreview() {
  const imageUrlInput = document.querySelector("#listing-image-url");
  const imagePreview = document.querySelector("#image-preview");

  imageUrlInput.addEventListener("input", () => {
    const url = imageUrlInput.value.trim();
    if (url) {
      imagePreview.src = url;
      imagePreview.alt = "Image Preview";
    } else {
      imagePreview.src = "/images/no-image.jpg";
      imagePreview.alt = "Gray circle with text 'No image'";
    }
  });
}
