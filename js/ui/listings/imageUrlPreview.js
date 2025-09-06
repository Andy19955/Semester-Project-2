import { createImageInput } from "./createImageInput.js";

/**
 * Sets up real-time image preview for multiple listing image URL input fields.
 * Supports up to 8 images with dynamic add/remove functionality and thumbnail gallery updates.
 */
export function imageUrlPreview() {
  const imageContainer = document.querySelector("#image-url-container");
  const mainImagePreview =
    document.querySelector("#main-image-preview") ||
    document.querySelector("#image-preview");
  const thumbnailsContainer = document.querySelector("#image-thumbnails");
  const addImageBtn = document.querySelector("#add-image-btn");

  let imageUrls = [];
  let maxImages = 8;

  /**
   * Updates the main image preview and thumbnail gallery based on current imageUrls array.
   * Shows fallback image if no valid images are available.
   */
  function updateImagePreviews() {
    if (imageUrls.length > 0 && imageUrls[0]) {
      mainImagePreview.src = imageUrls[0];
      mainImagePreview.alt = "Main auction image preview";
      mainImagePreview.onerror = function () {
        this.src = "/images/no-image.jpg";
        this.alt = "Gray circle with text 'No image'";
      };
    } else {
      mainImagePreview.src = "/images/no-image.jpg";
      mainImagePreview.alt = "Gray circle with text 'No image'";
    }

    thumbnailsContainer.innerHTML = "";

    if (imageUrls.length > 1) {
      thumbnailsContainer.style.display = "grid";

      imageUrls.forEach((url, index) => {
        if (url && url.trim()) {
          const thumbnail = document.createElement("div");
          thumbnail.className = `relative cursor-pointer border-2 rounded-lg overflow-hidden ${
            index === 0
              ? "border-blue-500"
              : "border-gray-200 hover:border-blue-300"
          }`;

          const img = document.createElement("img");
          img.src = url;
          img.alt = `Image ${index + 1}`;
          img.className = "w-full h-16 object-cover";
          img.onerror = function () {
            this.src = "/images/no-image.jpg";
          };

          thumbnail.appendChild(img);

          thumbnail.addEventListener("click", () => {
            if (index !== 0) {
              [imageUrls[0], imageUrls[index]] = [
                imageUrls[index],
                imageUrls[0],
              ];
              updateImagePreviews();
              updateInputFields();
            }
          });

          thumbnailsContainer.appendChild(thumbnail);
        }
      });
    } else {
      thumbnailsContainer.style.display = "none";
    }
  }

  /**
   * Synchronizes input field values with the current imageUrls array.
   */
  function updateInputFields() {
    const inputGroups = imageContainer.querySelectorAll(
      ".image-url-input-group",
    );
    inputGroups.forEach((group, index) => {
      const input = group.querySelector("input[name='imageUrl']");
      input.value = imageUrls[index] || "";
    });
  }

  /**
   * Handles input changes for image URL fields and updates previews.
   *
   * @param {Event} event - The input event containing the changed URL value
   */
  function handleImageInputChange() {
    const inputGroups = imageContainer.querySelectorAll(
      ".image-url-input-group",
    );
    imageUrls = Array.from(inputGroups).map((group) => {
      const input = group.querySelector("input[name='imageUrl']");
      return input.value.trim();
    });
    updateImagePreviews();
  }

  /**
   * Controls the visibility of remove buttons based on the number of image inputs.
   */
  function updateRemoveButtons() {
    const inputGroups = imageContainer.querySelectorAll(
      ".image-url-input-group",
    );
    inputGroups.forEach((group) => {
      const removeBtn = group.querySelector(".remove-image-btn");
      if (removeBtn) {
        if (inputGroups.length === 1) {
          removeBtn.classList.add("hidden");
        } else {
          removeBtn.classList.remove("hidden");
        }
      }
    });
  }

  /**
   * Updates the add button state based on the current number of image inputs.
   */
  function updateAddButton() {
    const currentAddImageBtn = document.querySelector("#add-image-btn");
    const currentInputs = imageContainer.querySelectorAll(
      ".image-url-input-group",
    ).length;
    if (currentInputs >= maxImages) {
      currentAddImageBtn.disabled = true;
      currentAddImageBtn.classList.add("opacity-50", "cursor-not-allowed");
      currentAddImageBtn.innerHTML = "";
      const icon = document.createElement("i");
      icon.className = "fa fa-check";
      currentAddImageBtn.appendChild(icon);
      currentAddImageBtn.appendChild(
        document.createTextNode(" Maximum images reached"),
      );
    } else {
      currentAddImageBtn.disabled = false;
      currentAddImageBtn.classList.remove("opacity-50", "cursor-not-allowed");
      currentAddImageBtn.innerHTML = "";
      const icon = document.createElement("i");
      icon.className = "fa fa-plus";
      currentAddImageBtn.appendChild(icon);
      currentAddImageBtn.appendChild(
        document.createTextNode(" Add another image"),
      );
    }
  }

  const firstInput = imageContainer.querySelector("input[name='imageUrl']");
  const firstRemoveBtn = imageContainer.querySelector(".remove-image-btn");

  if (firstInput) {
    firstInput.addEventListener("input", handleImageInputChange);
  }

  if (firstRemoveBtn) {
    firstRemoveBtn.addEventListener("click", () => {
      const inputGroups = imageContainer.querySelectorAll(
        ".image-url-input-group",
      );
      if (inputGroups.length > 0) {
        inputGroups[0].remove();
        const updatedGroups = imageContainer.querySelectorAll(
          ".image-url-input-group",
        );
        imageUrls = Array.from(updatedGroups).map((group) => {
          const input = group.querySelector("input[name='imageUrl']");
          return input.value.trim();
        });
        updateImagePreviews();
        updateRemoveButtons();
        updateAddButton();
      }
    });
  }

  const newAddImageBtn = addImageBtn.cloneNode(true);
  addImageBtn.parentNode.replaceChild(newAddImageBtn, addImageBtn);

  newAddImageBtn.addEventListener("click", () => {
    const currentInputs = imageContainer.querySelectorAll(
      ".image-url-input-group",
    ).length;
    if (currentInputs < maxImages) {
      const newInput = createImageInput({
        onInputChange: handleImageInputChange,
        onRemove: (inputGroup) => {
          inputGroup.remove();
          const updatedGroups = imageContainer.querySelectorAll(
            ".image-url-input-group",
          );
          imageUrls = Array.from(updatedGroups).map((group) => {
            const input = group.querySelector("input[name='imageUrl']");
            return input.value.trim();
          });
          updateImagePreviews();
          updateRemoveButtons();
          updateAddButton();
        },
      });
      imageContainer.appendChild(newInput);
      imageUrls.push("");
      updateRemoveButtons();
      updateAddButton();
      newInput.querySelector("input").focus();
    }
  });

  updateRemoveButtons();
  updateAddButton();

  const existingInputs = imageContainer.querySelectorAll(
    "input[name='imageUrl']",
  );

  imageUrls = [];
  existingInputs.forEach((input, index) => {
    imageUrls[index] = input.value.trim();

    if (!input.hasAttribute("data-preview-listener")) {
      input.addEventListener("input", handleImageInputChange);
      input.setAttribute("data-preview-listener", "true");
    }
  });

  const existingRemoveButtons =
    imageContainer.querySelectorAll(".remove-image-btn");
  existingRemoveButtons.forEach((btn) => {
    if (!btn.hasAttribute("data-preview-listener")) {
      btn.addEventListener("click", () => {
        const inputGroup = btn.closest(".image-url-input-group");
        inputGroup.remove();
        const updatedGroups = imageContainer.querySelectorAll(
          ".image-url-input-group",
        );
        imageUrls = Array.from(updatedGroups).map((group) => {
          const input = group.querySelector("input[name='imageUrl']");
          return input.value.trim();
        });
        updateImagePreviews();
        updateRemoveButtons();
        updateAddButton();
      });
      btn.setAttribute("data-preview-listener", "true");
    }
  });

  updateImagePreviews();
}
