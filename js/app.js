import { toggleMenu } from "./ui/shared/toggleMenu.js";
import { registrationFormListener } from "./listeners/auth/registrationFormListener.js";
import { loginFormListener } from "./listeners/auth/loginFormListener.js";

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
    case "/login/":
    case "/login/index.html":
      toggleMenu();
      loginFormListener();
      break;
  }
}

router();
