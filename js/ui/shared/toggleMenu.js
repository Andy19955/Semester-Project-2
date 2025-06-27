/**
 * Toggles the visibility of the mobile menu.
 *
 * @example
 * toggleMenu();
 */
export function toggleMenu() {
  const button = document.querySelector("#menu-button");
  const menu = document.querySelector("#mobile-menu");

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}
