// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
//

import { test, expect } from '@playwright/test';

test('example.com has correct title and heading', async ({ page }) => {
  await page.goto('https://example.com');

  // Check that the page title is "Example Domain"
  await expect(page).toHaveTitle('Example Domain');

  // Check that the page has an <h1> with the text "Example Domain"
  await expect(page.locator('h1')).toHaveText('Example Domain');
});
