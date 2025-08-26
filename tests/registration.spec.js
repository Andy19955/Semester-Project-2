import { test, expect } from "@playwright/test";

test.describe("User Registration", () => {
  test("user can register with stud.noroff.no email", async ({ page }) => {
    await page.route("https://v2.api.noroff.dev/auth/register", (route) =>
      route.fulfill({
        status: 201,
        json: {
          data: {
            name: process.env.TEST_USER_NAME,
            email: process.env.TEST_USER_EMAIL,
            id: "mock_user_id_12345",
          },
        },
      }),
    );

    await page.goto("/register");

    await page.locator("input[name='name']").fill(process.env.TEST_USER_NAME);
    await page.locator("input[name='email']").fill(process.env.TEST_USER_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { type: "submit" }).click();

    await expect(page.locator("#messageContainer")).toContainText(
      "Account created successfully",
    );
  });

  test("registration fails with non-stud.noroff.no email", async ({ page }) => {
    await page.goto("/register");

    await page.locator("input[name='name']").fill(process.env.TEST_USER_NAME);
    await page
      .locator("input[name='email']")
      .fill(process.env.TEST_USER_WRONG_EMAIL);
    await page
      .locator("input[name='password']")
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { type: "submit" }).click();

    const emailInput = page.locator("input[name='email']");

    const isValid = await emailInput.evaluate((input) => input.validity.valid);
    expect(isValid).toBe(false);

    const validationMessage = await emailInput.evaluate(
      (input) => input.validationMessage,
    );
    expect(validationMessage).toBeTruthy();

    expect(page.url()).toContain("/register");
  });
});
