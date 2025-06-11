import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Automation Exercise/);

  const homePage = await page.locator('.logo img');
  await expect(homePage).toBeVisible();

});

test.describe.only('Test Case 1: Register User', () => {
  test('should register a new user', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    // Signup / LoginPage
    await page.getByRole('heading', { name: 'New User Signup!' }).isVisible();

    await page.getByRole('textbox', { name: 'Name' }).fill('Hello');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('roadexplorer24@gmail.com');

    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeEnabled();
    await page.getByRole('button', { name: 'Signup' }).click();

    // Account Creation Page
    await page.getByText('Enter Account Information').isVisible();

    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).fill('NnhWRPmMa6c@r');
    await page.locator('#days').selectOption('3');
    await page.locator('#months').selectOption('6');
    await page.locator('#years').selectOption('2004');
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await page.getByRole('textbox', { name: 'First name *' }).fill('My Name');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('Surname');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('ABC');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('1000 Somewhere');
    await page.getByLabel('Country *').selectOption('Singapore');
    await page.getByRole('textbox', { name: 'State *' }).fill('Out there');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('No where City');
    await page.locator('#zipcode').fill('9999');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('12345456');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await page.getByText('Account Created!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // Back to Home Page
    await page.getByRole('heading', { name: 'Logged in as Hello' }).isVisible();

    // Delete Account
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});

