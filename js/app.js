import { toggleMenu } from "./ui/shared/toggleMenu.js";
import { registrationFormListener } from "./listeners/auth/registrationFormListener.js";
import { loginFormListener } from "./listeners/auth/loginFormListener.js";
import { logoutButtonListener } from "./listeners/auth/logoutButtonListener.js";
import {
  updateAuthUI,
  redirectIfLoggedIn,
  requireAuth,
} from "./helpers/authStatus.js";
import { profileHandler } from "./handlers/profiles/profileHandler.js";
import { editProfileHandler } from "./handlers/profiles/editProfileHandler.js";
import { editProfileFormListener } from "./listeners/profiles/editProfileFormListener.js";
import { activeListingsHandler } from "./handlers/listings/activeListingsHandler.js";
import { singleListingHandler } from "./handlers/listings/singleListingHandler.js";

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
      activeListingsHandler(6, 1, false);
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
      profileHandler();
      break;
    case "/profile/edit-profile/":
    case "/profile/edit-profile/index.html":
      requireAuth();
      toggleMenu();
      logoutButtonListener();
      editProfileHandler();
      editProfileFormListener();
      break;
    case "/auctions/":
    case "/auctions/index.html":
      toggleMenu();
      logoutButtonListener();
      activeListingsHandler(40, 1, true);
      break;
    case "/listing/":
    case "/listing/index.html":
      toggleMenu();
      singleListingHandler();
      updateAuthUI();
      logoutButtonListener();
      break;
  }
}

router();
