import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { displayMessage } from "./displayMessage.js";

describe("displayMessage", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-container";
    container.classList.add("hidden");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  });

  it("should display an error message with correct styling", () => {
    displayMessage(container, "error", "Test error message");

    const messageDiv = container.querySelector("div");
    const messageText = container.querySelector("p");

    expect(messageDiv).toBeTruthy();
    expect(messageText).toBeTruthy();
    expect(messageText.innerText).toBe("Test error message");

    expect(messageDiv.classList.contains("bg-red-100")).toBe(true);
    expect(messageDiv.classList.contains("text-red-900")).toBe(true);
    expect(messageDiv.classList.contains("border-red-900")).toBe(true);

    expect(container.classList.contains("hidden")).toBe(false);
  });

  it("should display a success message with correct styling", () => {
    displayMessage(container, "success", "Test success message");

    const messageDiv = container.querySelector("div");
    const messageText = container.querySelector("p");

    expect(messageText.innerText).toBe("Test success message");

    expect(messageDiv.classList.contains("bg-green-100")).toBe(true);
    expect(messageDiv.classList.contains("text-green-900")).toBe(true);
    expect(messageDiv.classList.contains("border-green-900")).toBe(true);

    expect(container.classList.contains("hidden")).toBe(false);
  });

  it("should work with string selector for container", () => {
    displayMessage("#test-container", "error", "Test with selector");

    const messageText = container.querySelector("p");
    expect(messageText.innerText).toBe("Test with selector");
    expect(container.classList.contains("hidden")).toBe(false);
  });

  it("should clear previous content before adding new message", () => {
    container.innerHTML =
      "<div>Previous content</div><span>More content</span>";

    displayMessage(container, "success", "New message");

    expect(container.children.length).toBe(1);
    const messageText = container.querySelector("p");
    expect(messageText.innerText).toBe("New message");
    expect(
      container.querySelector("div").classList.contains("bg-green-100"),
    ).toBe(true);
  });

  it("should handle empty message text", () => {
    displayMessage(container, "error", "");

    const messageText = container.querySelector("p");
    expect(messageText.innerText).toBe("");
    expect(container.classList.contains("hidden")).toBe(false);
  });
});
