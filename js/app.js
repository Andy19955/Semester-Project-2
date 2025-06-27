import { toggleMenu } from "./ui/shared/toggleMenu.js";

function router() {
  const { pathname } = location;

  switch (pathname) {
    case "/":
    case "/index.html":
      toggleMenu();
      break;
  }
}

router();
