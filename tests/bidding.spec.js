import { test, expect } from "@playwright/test";

test.describe("Bidding System", () => {
  test("user can place a bid", async ({ page }) => {
    await page.route("https://v2.api.noroff.dev/auth/login", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: {
            name: "Test User",
            email: process.env.TEST_USER_EMAIL,
            accessToken: "mock_access_token_12345",
          },
        },
      }),
    );

    await page.route("https://v2.api.noroff.dev/auth/create-api-key", (route) =>
      route.fulfill({
        status: 201,
        json: {
          data: {
            name: "Test User API Key",
            status: "Active",
            key: "mock_api_key_12345",
          },
        },
      }),
    );

    await page.route(
      "https://v2.api.noroff.dev/auction/listings/*",
      (route) => {
        if (route.request().method() === "GET") {
          route.fulfill({
            status: 200,
            json: {
              data: {
                id: "test-listing",
                title: "Test Auction",
                description: "A test auction item",
                endsAt: new Date(Date.now() + 86400000).toISOString(),
                bids: [],
                seller: {
                  name: "Other User",
                  email: "other@noroff.no",
                },
                media: [
                  {
                    url: "https://images.unsplash.com/photo-1500522144261-ea64433bbe27",
                    alt: "Test auction item",
                  },
                ],
                _count: {
                  bids: 0,
                },
              },
            },
          });
        }
      },
    );

    await page.route(
      "https://v2.api.noroff.dev/auction/listings/*/bids",
      (route) =>
        route.fulfill({
          status: 201,
          json: {
            data: {
              id: "bid-123",
              amount: 100,
              bidder: {
                name: "Test User",
                email: process.env.TEST_USER_EMAIL,
              },
            },
          },
        }),
    );

    await page.goto("/login");
    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);
    await page.locator("button[type='submit']").click();

    await page.waitForURL("/profile/");

    await page.goto("/listing/?id=test-listing");

    await page.waitForSelector("#bid-amount");

    await page.locator("#bid-amount").fill("100");
    await page.locator("#submit-bid-form").click();

    await page.waitForLoadState("load");
  });

  test("bidding validates minimum amount", async ({ page }) => {
    await page.route("https://v2.api.noroff.dev/auth/login", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: {
            name: "Test User",
            email: process.env.TEST_USER_EMAIL,
            accessToken: "mock_access_token_12345",
          },
        },
      }),
    );

    await page.route("https://v2.api.noroff.dev/auth/create-api-key", (route) =>
      route.fulfill({
        status: 201,
        json: {
          data: {
            name: "Test User API Key",
            status: "Active",
            key: "mock_api_key_12345",
          },
        },
      }),
    );

    await page.route(
      "https://v2.api.noroff.dev/auction/listings/test-listing**",
      (route) => {
        if (route.request().method() === "GET") {
          route.fulfill({
            status: 200,
            json: {
              data: {
                id: "test-listing",
                title: "Test Auction",
                description: "A test auction item",
                endsAt: new Date(Date.now() + 86400000).toISOString(),
                bids: [
                  {
                    amount: 50,
                    bidder: {
                      name: "Previous Bidder",
                      email: "previous@noroff.no",
                    },
                  },
                ],
                seller: {
                  name: "Other User",
                  email: "other@noroff.no",
                },
                media: [
                  {
                    url: "https://images.unsplash.com/photo-1500522144261-ea64433bbe27",
                    alt: "Test auction item",
                  },
                ],
                _count: {
                  bids: 1,
                },
              },
            },
          });
        }
      },
    );

    await page.route(
      "https://v2.api.noroff.dev/auction/listings/test-listing/bids",
      (route) =>
        route.fulfill({
          status: 400,
          json: {
            errors: [
              {
                message: "Bid amount must be higher than current highest bid",
              },
            ],
          },
        }),
    );

    await page.goto("/login");
    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);
    await page.locator("button[type='submit']").click();

    await page.waitForURL("/profile/");

    await page.goto("/listing/?id=test-listing");

    await page.waitForSelector("#bid-amount");

    await page.evaluate(() => {
      const form = document.querySelector("#bidding-form");
      form.setAttribute("novalidate", "");
    });

    await page.locator("#bid-amount").fill("0");
    await page.locator("#submit-bid-form").click();

    await page.waitForSelector("#messageContainer");
    await expect(page.locator("#messageContainer")).toContainText(
      "Please enter a bid amount greater than zero",
    );
  });
});
