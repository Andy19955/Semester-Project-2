import { fallbackImage, fallBackImageAlt } from "../../constants/constants.js";

/**
 * Creates a DOM element representing a listing card with hover effects and overlay.
 * Generates a clickable listing card with author avatar, listing image, and title overlay.
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
 * @returns {HTMLAnchorElement} - The clickable DOM element representing the listing card.
 *
 * @example
 * const listing = {
 *   id: "1",
 *   title: "My Listing Title",
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
 * const listingElement = createListing(listing);
 * document.body.append(listingElement);
 */
export function createListing(listing) {
  const listingCardLink = document.createElement("a");
  listingCardLink.setAttribute("href", `/listing/?id=${listing.id}`);

  const listingCard = document.createElement("div");
  listingCard.classList.add(
    "bg-white",
    "p-4",
    "flex",
    "flex-col",
    "gap-2",
    "overflow-hidden",
    "shadow",
    "hover:shadow-lg",
    "hover:cursor-pointer",
    "rounded-lg",
  );

  const listingImage = document.createElement("img");
  listingImage.classList.add(
    "rounded-lg",
    "shadow-md",
    "object-cover",
    "transition-all",
    "duration-300",
    "w-full",
    "h-52",
    "group-hover:h-full",
  );
  if (listing.media && listing.media.length > 0 && listing.media[0]?.url) {
    listingImage.setAttribute(
      "alt",
      listing.media[0]?.alt ||
        (listing.media[0]?.url
          ? `${listing.title} listing's featured image`
          : fallBackImageAlt),
    );
    listingImage.src = listing.media[0].url;
    listingImage.onerror = () => {
      listingImage.src = fallbackImage;
      listingImage.alt = fallBackImageAlt;
      listingImage.onerror = null;
    };
  } else {
    listingImage.alt = fallBackImageAlt;
    listingImage.src = fallbackImage;
  }

  const listingTitle = document.createElement("h2");
  listingTitle.classList.add("text-black", "font-semibold");
  listingTitle.innerText = listing.title;

  const listingDescription = document.createElement("div");
  listingDescription.classList.add(
    "flex",
    "flex-col",
    "justify-between",
    "items-center",
    "md:flex-row",
    "gap-2",
  );

  const listingEndsAt = document.createElement("p");
  listingEndsAt.classList.add("text-gray-500");
  listingEndsAt.innerText = `Ends at: ${new Date(listing.endsAt).toLocaleString(
    "no-NO",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  )}`;

  const listingBids = document.createElement("p");
  listingBids.classList.add("text-gray-500");
  listingBids.innerText = `${listing._count.bids} bids`;

  listingDescription.append(listingEndsAt, listingBids);

  listingCard.append(listingImage, listingTitle, listingDescription);
  listingCardLink.append(listingCard);
  return listingCardLink;
}
