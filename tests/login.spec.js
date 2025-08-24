import { test, expect } from "@playwright/test";

test.describe("User login", () => {
  test("user can login", async ({ page }) => {
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

    await page.getByRole("button", { type: "submit" }).click();

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("wrong password shows error", async ({ page }) => {
    await page.route("https://v2.api.noroff.dev/auth/login", (route) =>
      route.fulfill({
        status: 401,
        json: {
          errors: [
            {
              message: "Invalid email or password",
            },
          ],
        },
      }),
    );

    await page.goto("/login");

    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page.locator("input[name='password']").fill("wrongpassword");

    await page.getByRole("button", { type: "submit" }).click();

    await expect(page.locator("#messageContainer")).toContainText(
      "Invalid email or password",
    );
  });
});
