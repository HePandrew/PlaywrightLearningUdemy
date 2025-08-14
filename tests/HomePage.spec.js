const { test, expect } = require('@playwright/test');

test('Home Page', async ({ page }) => {
  await page.goto('https://www.google.com/');
  const   pageTitle =await page.title();
  console.log('The Page Title is : ', pageTitle);
  const pageURL = page.url();
  console.log('The Page URL is : ', pageURL);


  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle('Google');
});