import { test, expect } from "@playwright/test";

test.describe("View Bids", () => {
  test("user can view bids on a listing", async ({ page }) => {
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

    await page.route("https://v2.api.noroff.dev/auction/listings/*", (route) =>
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
                amount: 100,
                bidder: {
                  name: "John Doe",
                  email: "john@noroff.no",
                },
              },
              {
                amount: 150,
                bidder: {
                  name: "Jane Smith",
                  email: "jane@noroff.no",
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
              bids: 2,
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

    await expect(page.locator("#bids-wrapper")).toContainText("100");
    await expect(page.locator("#bids-wrapper")).toContainText("150");
  });

  test("shows message when no bids exist", async ({ page }) => {
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

    await page.route("https://v2.api.noroff.dev/auction/listings/*", (route) =>
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

    await expect(page.locator("#bids-wrapper")).toContainText(
      "No bids have been placed",
    );
  });
});
