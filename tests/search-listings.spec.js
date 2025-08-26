import { test, expect } from "@playwright/test";

test.describe("Search Listings", () => {
  test("unregistered user can search listings", async ({ page }) => {
    await page.route(
      "https://v2.api.noroff.dev/auction/listings/search?q=*",
      (route) => {
        route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: "search-1",
                title: "Vintage Camera",
                description: "Classic camera for photography",
                endsAt: new Date(Date.now() + 86400000).toISOString(),
                media: [
                  {
                    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                    alt: "Vintage camera",
                  },
                ],
                bids: [],
                seller: {
                  name: "Camera Seller",
                  email: "cameras@noroff.no",
                },
                _count: {
                  bids: 0,
                },
              },
            ],
            meta: {
              isFirstPage: true,
              isLastPage: true,
              currentPage: 1,
              previousPage: null,
              nextPage: null,
              pageCount: 1,
              totalCount: 1,
            },
          },
        });
      },
    );

    await page.route(
      "https://v2.api.noroff.dev/auction/listings?*",
      (route) => {
        route.fulfill({
          status: 200,
          json: {
            data: [
              {
                id: "1",
                title: "Test Auction 1",
                description: "Test description",
                endsAt: new Date(Date.now() + 86400000).toISOString(),
                media: [
                  {
                    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                    alt: "Test auction 1",
                  },
                ],
                bids: [],
                seller: {
                  name: "Seller One",
                  email: "seller1@noroff.no",
                },
                _count: {
                  bids: 0,
                },
              },
              {
                id: "2",
                title: "Vintage Camera",
                description: "Old camera",
                endsAt: new Date(Date.now() + 172800000).toISOString(),
                media: [
                  {
                    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                    alt: "Vintage camera",
                  },
                ],
                bids: [],
                seller: {
                  name: "Seller Two",
                  email: "seller2@noroff.no",
                },
                _count: {
                  bids: 0,
                },
              },
            ],
            meta: {
              isFirstPage: true,
              isLastPage: true,
              currentPage: 1,
              previousPage: null,
              nextPage: null,
              pageCount: 1,
              totalCount: 2,
            },
          },
        });
      },
    );

    await page.goto("/auctions");

    await page.waitForSelector("#search-input");

    await page.locator("input[name='searchQuery']").fill("vintage");
    await page.locator("#search-button").click();

    await expect(page.locator("#listings-container")).toContainText(
      "Vintage Camera",
    );
  });
});
