/**
 * @param {(string|HTMLElement)} container - The container where the message will be displayed
 * @param {('error'|'success')} messageType - The type of message to display
 * @param {string} message - The text content of the message to display
 * @returns {void} - This function doesn't return anything
 *
 * @example
 * // Use this function to display a styled error or a success message on the page.
 * displayMessage("#messageContainer", "error", "Something went wrong!");
 */

export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.replaceChildren();

  let messageClasses = [
    "font-medium",
    "p-3",
    "border-solid",
    "border-2",
    "break-all",
  ];
  switch (messageType) {
    case "error":
      messageClasses.push("bg-red-100", "text-red-900", "border-red-900");
      break;
    case "success":
      messageClasses.push("bg-green-100", "text-green-900", "border-green-900");
      break;
    case "info":
      messageClasses.push("bg-blue-100", "text-blue-900", "border-blue-900");
      break;
  }

  const messageDiv = document.createElement("div");
  messageDiv.classList.add(...messageClasses);

  const messageContent = document.createElement("p");
  messageContent.innerText = message;

  messageDiv.append(messageContent);
  parent.append(messageDiv);
  parent.classList.remove("hidden");
}
