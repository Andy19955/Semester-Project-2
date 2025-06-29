import { registrationFormListener } from "./listeners/registrationFormListener.js";
import { toggleMenu } from "./ui/shared/toggleMenu.js";

/**
 * Routes the application based on current pathname.
 * Initializes appropriate functionality for each page.
 *
 * @returns {void}
 *
 * @example
 * // Called automatically when app loads
 * router();
 */
function router() {
  const { pathname } = location;

  switch (pathname) {
    case "/":
    case "/index.html":
      toggleMenu();
      break;
    case "/register/":
    case "/register/index.html":
      toggleMenu();
      registrationFormListener();
      break;
  }
}

router();
