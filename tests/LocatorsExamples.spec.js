const { test, expect } = require('@playwright/test');

test('Home Page', async ({ page }) => {
  await page.goto('https://hive.clinic/#/authentication/signin');
  const   pageTitle =await page.title();
  console.log('The Page Title is : ', pageTitle);
  //click login button by PROPERTY locator
  //await page.locator('id=username').click(); OR
  await page.click('id=username');

  //provide username by XPATH
  await page.locator("//input[@id='username']").fill("xavierandrew16@gmail.com");
  //OR await page.fill("//input[@id='username']",'xavierandrew16@gmail.com')

  //password
  await page.type("//input[@id='password']",'Test123');

  //click Login buttom
  await page.locator("//button[@type='submit']").click();

  //click clinical button
  await page.click("//a[contains(text(),'Clinical Users')]");


})