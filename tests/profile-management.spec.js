import { test, expect } from "@playwright/test";

test.describe("Profile Management", () => {
  test("user can update avatar", async ({ page }) => {
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
      "https://v2.api.noroff.dev/auction/profiles/*",
      (route) => {
        if (route.request().method() === "GET") {
          route.fulfill({
            status: 200,
            json: {
              data: {
                name: "Test User",
                email: process.env.TEST_USER_EMAIL,
                bio: "Test bio",
                avatar: {
                  url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                  alt: "Test User Avatar",
                },
                credits: 1000,
                _count: {
                  listings: 5,
                  wins: 2,
                },
              },
            },
          });
        } else if (route.request().method() === "PUT") {
          route.fulfill({
            status: 200,
            json: {
              data: {
                name: "Test User",
                email: process.env.TEST_USER_EMAIL,
                bio: "Test bio",
                avatar: {
                  url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                  alt: "Test User Avatar",
                },
                credits: 1000,
                _count: {
                  listings: 5,
                  wins: 2,
                },
              },
            },
          });
        }
      },
    );

    await page.goto("/login");
    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);
    await page.locator("button[type='submit']").click();

    await page.waitForURL("/profile/");

    await page.goto("/profile/edit-profile");

    await page.waitForSelector("#avatarUrl");

    const newAvatarUrl =
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150";
    await page.locator("#avatarUrl").fill(newAvatarUrl);
    await page.locator("#submit-edit-profile-form").click();

    await expect(page.locator("#messageContainer")).toBeVisible();
  });

  test("user can view credits", async ({ page }) => {
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

    await page.route("https://v2.api.noroff.dev/auction/profiles/*", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: {
            name: "Test User",
            email: process.env.TEST_USER_EMAIL,
            bio: "Test bio",
            avatar: {
              url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
              alt: "Test User Avatar",
            },
            credits: 1000,
            _count: {
              listings: 5,
              wins: 2,
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

    await page.waitForSelector("#profile-credits");

    await expect(page.locator("#profile-credits")).toContainText("1000");
  });
});
