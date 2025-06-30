import { toggleMenu } from "./ui/shared/toggleMenu.js";
import { registrationFormListener } from "./listeners/auth/registrationFormListener.js";
import { loginFormListener } from "./listeners/auth/loginFormListener.js";
import { logoutButtonListener } from "./listeners/auth/logoutButtonListener.js";
import {
  updateAuthUI,
  redirectIfLoggedIn,
  requireAuth,
} from "./helpers/authStatus.js";

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
      updateAuthUI();
      logoutButtonListener();
      break;
    case "/register/":
    case "/register/index.html":
      redirectIfLoggedIn();
      toggleMenu();
      registrationFormListener();
      break;
    case "/login/":
    case "/login/index.html":
      redirectIfLoggedIn();
      toggleMenu();
      loginFormListener();
      break;
    case "/profile/":
    case "/profile/index.html":
      requireAuth();
      toggleMenu();
      logoutButtonListener();
      break;
  }
}

router();
