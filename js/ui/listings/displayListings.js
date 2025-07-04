import { createListing } from "./createListing.js";

/**
 * Displays a list of listings in the specified container.
 * Creates and appends listing cards for each listing in the array.
 *
 * @param {Array<Object>} listings - An array of listing objects to display.
 * @param {HTMLElement} listingsContainer - The container element where the listings will be displayed.
 *
 * @example
 * const listings = [
 *   {
 *     id: "1",
 *     title: "Vintage Watch",
 *     author: {
 *       avatar: {
 *         url: "https://example.com/avatar1.jpg"
 *       }
 *     },
 *     media: {
 *       url: "https://example.com/watch.jpg",
 *       alt: "Vintage pocket watch"
 *     }
 *   },
 *   {
 *     id: "2",
 *     title: "Antique Vase",
 *     author: {
 *       avatar: {
 *         url: "https://example.com/avatar2.jpg"
 *       }
 *     },
 *     media: {
 *       url: "https://example.com/vase.jpg",
 *       alt: "Blue antique vase"
 *     }
 *   }
 * ];
 * const listingsContainer = document.querySelector("#listings-container");
 * displayListings(listings, listingsContainer);
 */
export function displayListings(listings, listingsContainer) {
  listings.forEach(function (listing) {
    const listingItem = createListing(listing);
    console.log(listingItem);
    listingsContainer.append(listingItem);
  });
}
