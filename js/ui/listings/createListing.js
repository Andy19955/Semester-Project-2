import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";

/**
 * Creates a DOM element representing a listing.
 *
 * @param {Object} listing - The listing object containing the data to display.
 * @param {string} listing.id - The ID of the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {Object} listing.author - The author object containing the name and avatar of the listing author.
 * @param {Object} listing.author.avatar - The avatar object containing the URL of the author's avatar.
 * @param {string} listing.author.avatar.url - The URL of the author's avatar image.
 * @param {Object} [listing.media] - The media object containing the URL and alt text of the listing image.
 * @param {string} [listing.media.url] - The URL of the listing image.
 * @param {string} [listing.media.alt] - The alt text for the listing image.
 *
 * @returns {HTMLAnchorElement} - The DOM element representing the listing.
 *
 * @example
 * const listing = {
 *   id: "1",
 *   title: "My listing Title",
 *   author: {
 *     avatar: {
 *       url: "https://example.com/avatar.jpg"
 *     }
 *   },
 *   media: {
 *     url: "https://example.com/image.jpg",
 *     alt: "An example image"
 *   }
 * };
 * const listingElement = createlisting(listing);
 * document.body.append(listingElement);
 */
export function createListing(listing) {
  const listingCardLink = document.createElement("a");
  listingCardLink.setAttribute("href", `/listing/?id=${listing.id}`);

  const listingCard = document.createElement("div");
  listingCard.classList.add(
    "overflow-hidden",
    "relative",
    "group",
    "hover:cursor-pointer",
    "rounded-lg",
    "h-64",
  );

  const listingProfileImage = document.createElement("img");
  listingProfileImage.classList.add(
    "absolute",
    "top-1",
    "left-1",
    "z-20",
    "w-10",
    "h-10",
    "rounded-full",
  );
  listingProfileImage.src = listing.author.avatar.url;

  const listingImage = document.createElement("img");
  listingImage.classList.add(
    "rounded-lg",
    "shadow-md",
    "object-cover",
    "group-hover:scale-125",
    "transition-all",
    "duration-300",
    "w-full",
    "h-52",
    "group-hover:h-full",
  );
  if (listing.media && listing.media.url) {
    listingImage.setAttribute(
      "alt",
      listing.media?.alt ||
        (listing.media?.url
          ? `${listing.title} listing's featured image`
          : fallBackImageAlt),
    );
    listingImage.src = listing.media.url;
    listingImage.onerror = () => {
      listingImage.src = fallbackImage;
      listingImage.alt = fallBackImageAlt;
      listingImage.onerror = null;
    };
  } else {
    listingImage.alt = fallBackImageAlt;
    listingImage.src = fallbackImage;
  }

  const titleOverlayDiv = document.createElement("div");
  titleOverlayDiv.classList.add(
    "bg-black",
    "bg-opacity-30",
    "w-full",
    "h-full",
    "z-20",
    "absolute",
    "top-0",
    "left-0",
    "justify-center",
    "items-center",
    "hidden",
    "group-hover:flex",
  );
  const titleOverlayText = document.createElement("h2");
  titleOverlayText.classList.add("text-white", "font-semibold");
  titleOverlayText.innerText = listing.title;
  titleOverlayDiv.append(titleOverlayText);

  const listingTitle = document.createElement("h2");
  listingTitle.classList.add("text-black", "font-semibold");
  listingTitle.innerText = listing.title;

  listingCard.append(listingProfileImage);
  listingCard.append(listingImage);
  listingCard.append(titleOverlayDiv);
  listingCard.append(listingTitle);
  listingCardLink.append(listingCard);
  return listingCardLink;
}
