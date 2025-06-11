import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Automation Exercise/);

  const homePage = await page.locator('.logo img');
  await expect(homePage).toBeVisible();

});

var name = "Hello";
var email = "roadexplorer24@gmail.com";
var password = "NnhWRPmMa6c@r";
var birthDay = '3';
var birthMonth = '6';
var birthYear = "2004";
var firstName = "My Name";
var lastName = "Surname";
var company = "ABC";
var address = "1000 Somewhere";
var country = "Singapore";
var state = "Out there";
var city = "No where City";
var zipcode = "9999";
var mobileNumber = "12345456";

// .serial for sequencial execution
test.describe.serial('Sequential test group', () => {

  test('Test Case 1: Register User', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Signup / LoginPage
    await page.getByRole('heading', { name: 'New User Signup!' }).isVisible();

    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);

    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeEnabled();
    await page.getByRole('button', { name: 'Signup' }).click();

    // Account Creation Page
    await page.getByText('Enter Account Information').isVisible();

    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await page.locator('#days').selectOption(birthDay);
    await page.locator('#months').selectOption(birthMonth);
    await page.locator('#years').selectOption(birthYear);
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);
    await page.getByLabel('Country *').selectOption(country);
    await page.getByRole('textbox', { name: 'State *' }).fill(state);
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
    await page.locator('#zipcode').fill(zipcode);
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobileNumber);
    await page.getByRole('button', { name: 'Create Account' }).click();

    await page.getByText('Account Created!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // Back to Home Page
    await page.getByRole('heading', { name: `Logged in as ${name}` }).isVisible();

    // // Delete Account
    // await page.getByRole('link', { name: 'Delete Account' }).click();
    // await page.getByText('Account Deleted!').isVisible();
    // await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();

    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await page.getByRole('button', { name: 'Login' }).click();

    // Back to Home Page
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('heading', { name: `Logged in as ${name}` }).isVisible();

    // // Delete Account
    // await page.getByRole('link', { name: 'Delete Account' }).click();
    // await page.getByText('Account Deleted!').isVisible();
    // await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();

    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('Test Case 4: Logout User', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();

    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await page.getByRole('button', { name: 'Login' }).click();

    // Back to Home Page
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('heading', { name: `Logged in as ${name}` }).isVisible();

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

});


