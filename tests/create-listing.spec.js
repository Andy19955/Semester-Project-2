import { test, expect } from "@playwright/test";

test.describe("Create Listing", () => {
  test("user can create a listing", async ({ page }) => {
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

    await page.route("https://v2.api.noroff.dev/auction/listings", (route) =>
      route.fulfill({
        status: 201,
        json: {
          data: {
            id: "test-listing-123",
            title: "Test Auction",
            description: "Test description",
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

    await page.goto("/create-auction");

    await page.locator("input[name='title']").fill("Test Auction");
    await page.locator("textarea[name='description']").fill("Test description");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateString = futureDate.toISOString().slice(0, 16);
    await page.locator("input[name='endsAt']").fill(dateString);

    await page
      .locator("input[name='imageUrl']")
      .fill(
        "https://images.unsplash.com/photo-1756187793625-4a29fef1f4f8?q=80&w=500",
      );

    await page.locator("#submit-create-listing-form").click();

    await expect(page.locator("#messageContainer")).toBeVisible();
  });

  test("form validates required fields", async ({ page }) => {
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

    await page.goto("/login");
    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);
    await page.locator("button[type='submit']").click();

    await page.waitForURL("/profile/");

    await page.goto("/create-auction");

    await page.evaluate(() => {
      const form = document.querySelector("#create-listing-form");
      form.setAttribute("novalidate", "");
    });

    await page.locator("#submit-create-listing-form").click();

    await expect(page.locator("#messageContainer")).toContainText(
      "Please fill in all required fields",
    );
  });
});
