import { test, expect } from '@playwright/test';
import { time } from 'console';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Automation Exercise/);

  const homePage = await page.locator('.logo img');
  await expect(homePage).toBeVisible();

});

var name = "Hello";
var title = "Mr.";
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

async function registerUser(page, {
  name,
  email,
  title,
  password,
  birthDay,
  birthMonth,
  birthYear,
  firstName,
  lastName,
  company,
  address,
  country,
  state,
  city,
  zipcode,
  mobileNumber
}) {
  // Signup / LoginPage
  await page.getByRole('heading', { name: 'New User Signup!' }).isVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);

  await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Signup' })).toBeEnabled();
  await page.getByRole('button', { name: 'Signup' }).click();

  // Account Creation Page
  await page.getByText('Enter Account Information').isVisible();
  await page.getByRole('radio', { name: title }).check();
  await page.getByRole('textbox', { name: 'Password *' }).fill(password);
  await page.locator('#days').selectOption(birthDay);
  await page.locator('#months').selectOption(birthMonth);
  await page.locator('#years').selectOption(birthYear);
  // await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  // await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  await page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);
  await page.getByLabel('Country *').selectOption(country);
  await page.getByRole('textbox', { name: 'State *' }).fill(state);
  await page.getByRole('textbox', { name: 'City' }).fill(city);
  await page.locator('#zipcode').fill(zipcode);
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobileNumber);
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL('https://automationexercise.com/account_created');
  await page.getByText('Account Created!').isVisible();
  await page.getByRole('link', { name: 'Continue' }).click({ force: true });
}

async function fillPaymentForm(page, {
  nameOnCard,
  cardNumber,
  cvc,
  mm,
  yyyy
}) {
  // Wait for and fill "Name on Card"
  const nameInput = page.locator('input[name="name_on_card"]');
  await nameInput.waitFor({ state: 'visible' });
  await nameInput.fill(nameOnCard);

  // Wait for and fill "Card Number"
  const cardNumberInput = page.locator('input[name="card_number"]');
  await cardNumberInput.waitFor({ state: 'visible' });
  await cardNumberInput.fill(cardNumber);

  // Wait for and fill "CVC"
  const cvcInput = page.getByRole('textbox', { name: 'ex.' });
  await cvcInput.waitFor({ state: 'visible' });
  await cvcInput.fill(cvc);

  // Wait for and fill "MM"
  const mmInput = page.getByRole('textbox', { name: 'MM' });
  await mmInput.waitFor({ state: 'visible' });
  await mmInput.fill(mm);

  // Wait for and fill "YYYY"
  const yyyyInput = page.getByRole('textbox', { name: 'YYYY' });
  await yyyyInput.waitFor({ state: 'visible' });
  await yyyyInput.fill(yyyy);

  // Wait for and click the "Pay and Confirm Order" button
  const payButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
  await payButton.waitFor({ state: 'visible' });
  await payButton.click();
}
/*
// .serial for sequencial execution
test.describe.serial('Sequential test group', () => {

  test('Test Case 1: Register User', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await registerUser(page, {
      name,
      email,
      title,
      password,
      birthDay,
      birthMonth,
      birthYear,
      firstName,
      lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    });

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

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'New User Signup!' }).isVisible();

    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);

    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeEnabled();
    await page.getByRole('button', { name: 'Signup' }).click();

    // Account Creation Page
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Search Product' }).fill('blue top');
    await page.getByRole('button', { name: '' }).click();

    await expect(page.locator('body')).toContainText('Blue Top');
    await page.locator('div.productinfo.text-center > img').hover();
    const addToCartButton = page.getByText('Add to cart').first();
    await expect(addToCartButton).toBeVisible();
    await page.getByText('Add to cart').nth(1).click();

    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.locator('#product-1')).toContainText('Blue Top');
    await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' })).toBeVisible();

    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();
    await expect(page.locator('#product-1')).toContainText('Blue Top');
    await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' })).toBeVisible();
  });

  test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();

    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    await page.getByRole('button', { name: 'Login' }).click();

    // Back to Home Page
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // View Cart Page
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    // Checkout Page
    await expect(page.locator('#address_delivery')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_delivery')).toContainText(`${company}`);
    await expect(page.locator('#address_delivery')).toContainText(`${address}`);
    await expect(page.locator('#address_delivery')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_delivery')).toContainText(`${mobileNumber}`);
    await page.locator('textarea[name="message"]').fill('Cash on Delivery');

    const placeOrderLink = page.locator('a.check_out', { hasText: 'Place Order' });
    await placeOrderLink.waitFor({ state: 'visible' });
    await placeOrderLink.click();

    // Payment Page
    await fillPaymentForm(page, {
      nameOnCard: firstName,
      cardNumber: '1111111111111111111',
      cvc: '123',
      mm: '99',
      yyyy: '9999'
    });

    // Confirmation Page
    await expect(page).toHaveURL(/payment_done/, { timeout: 20000 });
    await expect(page.locator('#form')).toContainText('Order Placed!');
    await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });

    // Back to Home Page
    await expect(page).toHaveURL('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });
  });


  test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();

    // View Cart Page
    await expect(page.getByText('Home Shopping Cart Proceed To')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();

    await registerUser(page, {
      name,
      email,
      title,
      password,
      birthDay,
      birthMonth,
      birthYear,
      firstName,
      lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    });

    // Back to Home Page
    await page.getByRole('heading', { name: `Logged in as ${name}` }).isVisible();
    await page.getByRole('link', { name: ' Cart' }).click();

    // View Cart Page
    await page.getByText('Proceed To Checkout').click();

    // Checkout Page
    await expect(page.locator('#address_delivery')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_delivery')).toContainText(`${company}`);
    await expect(page.locator('#address_delivery')).toContainText(`${address}`);
    await expect(page.locator('#address_delivery')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_delivery')).toContainText(`${mobileNumber}`);
    await page.locator('textarea[name="message"]').fill('Cash on Delivery');

    const placeOrderLink = page.locator('a.check_out', { hasText: 'Place Order' });
    await placeOrderLink.waitFor({ state: 'visible' });
    await placeOrderLink.click();

    // Payment Page
    await fillPaymentForm(page, {
      nameOnCard: firstName,
      cardNumber: '1111111111111111111',
      cvc: '123',
      mm: '99',
      yyyy: '9999'
    });

    // Confirmation Page
    await expect(page).toHaveURL(/payment_done/, { timeout: 20000 });
    await expect(page.locator('#form')).toContainText('Order Placed!');
    await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });

    // Back to Home Page
    await expect(page).toHaveURL('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });
  });

  test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();
    await registerUser(page, {
      name,
      email,
      title,
      password,
      birthDay,
      birthMonth,
      birthYear,
      firstName,
      lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    });

    // Back to Home Page
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // View Cart Page
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    // Checkout Page
    await expect(page.locator('#address_delivery')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_delivery')).toContainText(`${company}`);
    await expect(page.locator('#address_delivery')).toContainText(`${address}`);
    await expect(page.locator('#address_delivery')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_delivery')).toContainText(`${mobileNumber}`);
    await page.locator('textarea[name="message"]').fill('Cash on Delivery');

    const placeOrderLink = page.locator('a.check_out', { hasText: 'Place Order' });
    await placeOrderLink.waitFor({ state: 'visible' });
    await placeOrderLink.click();

    // Payment Page
    await fillPaymentForm(page, {
      nameOnCard: firstName,
      cardNumber: '1111111111111111111',
      cvc: '123',
      mm: '99',
      yyyy: '9999'
    });

    // Confirmation Page
    await expect(page).toHaveURL(/payment_done/, { timeout: 20000 });
    await expect(page.locator('#form')).toContainText('Order Placed!');
    await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });

    // Back to Home Page
    await expect(page).toHaveURL('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Delete Account' }).click({ timeout: 10000 });
    await page.getByText('Account Deleted!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });
  });

  test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    //Signup / Login Page
    //Signup / Login Page
    await page.getByRole('heading', { name: 'Login to your account' }).isVisible();
    await registerUser(page, {
      name,
      email,
      title,
      password,
      birthDay,
      birthMonth,
      birthYear,
      firstName,
      lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    });

    // Back to Home Page
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // View Cart Page
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    // Checkout Page
    await expect(page.locator('#address_delivery')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_delivery')).toContainText(`${company}`);
    await expect(page.locator('#address_delivery')).toContainText(`${address}`);
    await expect(page.locator('#address_delivery')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_delivery')).toContainText(`${country}`);
    await expect(page.locator('#address_delivery')).toContainText(`${mobileNumber}`);

    await expect(page.locator('#address_invoice')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_invoice')).toContainText(`${company}`);
    await expect(page.locator('#address_invoice')).toContainText(`${address}`);
    await expect(page.locator('#address_invoice')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_invoice')).toContainText(`${country}`);
    await expect(page.locator('#address_invoice')).toContainText(`${mobileNumber}`);

    await page.getByRole('link', { name: 'Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
  });

  test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
    await page.locator('.choose > .nav > li > a').first().click();
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();

    // View Cart Page
    await expect(page.getByText('Home Shopping Cart Proceed To')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();

    await registerUser(page, {
      name,
      email,
      title,
      password,
      birthDay,
      birthMonth,
      birthYear,
      firstName,
      lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    });

    // Back to Home Page
    await page.getByRole('heading', { name: `Logged in as ${name}` }).isVisible();
    await page.getByRole('link', { name: ' Cart' }).click();

    // View Cart Page
    await page.getByText('Proceed To Checkout').click();

    // Checkout Page
    await expect(page.locator('#address_delivery')).toContainText(`${title} ${firstName} ${lastName}`);
    await expect(page.locator('#address_delivery')).toContainText(`${company}`);
    await expect(page.locator('#address_delivery')).toContainText(`${address}`);
    await expect(page.locator('#address_delivery')).toContainText(`${city} ${state} ${zipcode}`);
    await expect(page.locator('#address_delivery')).toContainText(`${mobileNumber}`);
    await page.locator('textarea[name="message"]').fill('Cash on Delivery');

    const placeOrderLink = page.locator('a.check_out', { hasText: 'Place Order' });
    await placeOrderLink.waitFor({ state: 'visible' });
    await placeOrderLink.click();

    // Payment Page
    await fillPaymentForm(page, {
      nameOnCard: firstName,
      cardNumber: '1111111111111111111',
      cvc: '123',
      mm: '99',
      yyyy: '9999'
    });

    // Confirmation Page
    await expect(page).toHaveURL(/payment_done/, { timeout: 20000 });
    await expect(page.locator('#form')).toContainText('Order Placed!');
    await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;

    await page.getByRole('link', { name: 'Continue' }).click({ force: true, timeout: 10000 });

    // Back to Home Page
    await expect(page).toHaveURL('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
  });


});
*/
test.describe('Parallel test group', () => {
  /*
    test('Test Case 6: Contact Us Form', async ({ page }) => {
      await page.getByRole('link', { name: 'Contact us' }).click();
  
      // Contact Us Page
      await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  
      await page.getByRole('textbox', { name: 'Name' }).fill(name);
      await page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
      await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
      await page.getByRole('textbox', { name: 'Your Message Here' }).fill('This is a test message.');
  
      await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
      await page.getByRole('button', { name: 'Submit' }).click();
  
      page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      });
  
      await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
      await page.getByRole('button', { name: 'Submit' }).click();
  
      // Success Message
      await expect(
        page.locator('div').filter({
          hasText: 'Success! Your details have been submitted successfully.'
        }).nth(1)
      ).toBeVisible();
  
      // Go back to Home Page
      await page.getByRole('link', { name: ' Home' }).click();
      await expect(page).toHaveTitle(/Automation Exercise/);
    });
  
    test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
  
      // Test Cases Page
      await page.getByRole('link', { name: ' Test Cases' }).click();
  
      await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
    });
  
    test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
      await page.getByRole('link', { name: ' Products' }).click();
  
      // Product Page
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  
      //Check all Products if visible
      var n = 3;
      while (n <= 35) {
        var element = page.locator('.features_items > div:nth-child(' + n + ')');
        await expect(element).toBeVisible();
        n++;
      }
      await page.locator('.choose > .nav > li > a').first().click();
  
      // Product 1 Detail Page
      await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
  
      await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
      await expect(page.getByText('Category: Women > Tops')).toBeVisible();
      await expect(page.getByText('Rs.')).toBeVisible();
      await expect(page.getByText('Availability: In Stock')).toBeVisible();
      await expect(page.getByText('Condition: New')).toBeVisible();
      await expect(page.getByText('Brand: Polo')).toBeVisible();
    });
  
    test('Test Case 9: Search Product', async ({ page }) => {
      await page.getByRole('link', { name: ' Products' }).click();
  
      // Product Page
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Search Product' }).fill('Frozen Tops For Kids');
      await page.getByRole('button', { name: '' }).click();
  
      // Searched Product
      await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
      await expect(page.getByText('Frozen Tops For Kids').first()).toBeVisible();
    })
  
    test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Your email address' }).fill(email);
      await page.getByRole('button', { name: '' }).click();
  
      await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
    })
  
    test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
  
      await page.getByRole('link', { name: ' Cart' }).click();
  
      // Cart Page
      await expect(page.getByRole('heading')).toContainText('Subscription');
      await expect(page).toHaveURL('https://automationexercise.com/view_cart');
  
      await page.getByRole('textbox', { name: 'Your email address' }).fill(email);
      await page.getByRole('button', { name: '' }).click();
  
      await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
    });
  */
  test('Test Case 12: Add Products in Cart', async ({ page }) => {

    await page.getByRole('link', { name: ' Products' }).click();

    // Product Page
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    await page.locator('.productinfo > img').first().hover();
    const overlayBtn = page.locator('.overlay-content > .btn').first();
    await overlayBtn.waitFor({ state: 'visible', timeout: 10000 }); // waits up to 10 seconds
    await overlayBtn.click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator('.productinfo > img').nth(1).hover();
    const overlayBtn2 = page.locator('.overlay-content > .btn').nth(1);
    await overlayBtn2.waitFor({ state: 'visible', timeout: 10000 });
    await overlayBtn2.click();
    await page.getByRole('link', { name: 'View Cart' }).click();

    // View Cart Page
    await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' })).toBeVisible();
    await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' })).toBeVisible();
    await expect(page.locator('#product-1')).toContainText('Rs. 500');
    await expect(page.locator('#product-2')).toContainText('Rs. 400');
    await expect(page.locator('#product-1')).toContainText('1');
    await expect(page.locator('#product-2')).toContainText('1');
    await expect(page.locator('#product-1')).toContainText('Rs. 500');
    await expect(page.locator('#product-2')).toContainText('Rs. 400');
  });
  /*
    test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
      await page.locator('.choose > .nav > li > a').first().click();
      await page.locator('#quantity').click();
      await page.locator('#quantity').fill('4');
      await page.getByRole('button', { name: ' Add to cart' }).click();
      await page.getByRole('link', { name: 'View Cart' }).click();
  
      // View Cart Page
      await expect(page.locator('#product-1')).toContainText('4');
    });
  
    test('Test Case 17: Remove Products From Cart', async ({ page }) => {
      await page.locator('.productinfo > img').first().hover();
      await page.locator('.overlay-content > .btn').first().click();
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await page.getByRole('link', { name: ' Cart' }).click();
  
      // View Cart Page
      await expect(page.getByText('Home Shopping Cart Proceed To')).toBeVisible();
      await page.locator('a.cart_quantity_delete[data-product-id="1"]').click();
      await expect(page.locator('#empty_cart')).toBeVisible();
      await expect(page.locator('#empty_cart')).toContainText('Cart is empty! Click here to buy products.');
    });
  
    test('Test Case 18: View Category Products', async ({ page }) => {
      await expect(page.locator('div').filter({ hasText: 'Category Women Dress Tops' }).nth(2)).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();
      await page.getByRole('link', { name: ' Women' }).click();
      await page.getByRole('link', { name: 'Dress' }).click();
      await expect(page.locator('section')).toContainText('Women - Dress Products');
      await page.getByRole('link', { name: ' Men' }).click();
      await page.getByRole('link', { name: 'Tshirts' }).click();
      await expect(page.locator('section')).toContainText('Men - Tshirts Products');
    });
  
    test('Test Case 19: Verify All Brands', async ({ page }) => {
      await page.getByRole('link', { name: ' Products' }).click();
      await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
      await page.getByRole('link', { name: '(6) Polo' }).click();
      await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible();
      await page.getByRole('link', { name: '(5) H&M' }).click();
      await expect(page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible();
    });
  
    test('Test Case 21: Add review on product', async ({ page }) => {
      await page.getByRole('link', { name: ' Products' }).click();
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
      await page.locator('.choose > .nav > li > a').first().click();
  
      await expect(page.getByRole('link', { name: 'Write Your Review' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
      await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(email);
      await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('My product review');
      await page.getByRole('button', { name: 'Submit' }).click();
  
      await expect(page.getByText('Thank you for your review.')).toBeVisible();
    });
  
    test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible();
      await expect(page.locator('body')).toContainText('recommended items');
      await expect(page.locator('#recommended-item-carousel')).toContainText('Stylish Dress');
  
      await page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();
      await page.getByRole('link', { name: 'View Cart' }).click();
      await expect(page.getByRole('row', { name: 'Product Image Stylish Dress' })).toBeVisible();
    });
  
    test('Test Case 25: Verify Scroll Up using \'Arrow\' button and Scroll Down functionality', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page.locator('#slider-carousel')).toContainText('Full-Fledged practice website for Automation Engineers');
    });
  
    test('Test Case 26: Verify Scroll Up without \'Arrow\' button and Scroll Down functionality', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
  
      await expect(page.locator('#slider-carousel')).toContainText('Full-Fledged practice website for Automation Engineers');
    });
  */
});


