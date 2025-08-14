const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await username.fill("rahulshetty");
  //giving wrong username to get the vaidation text
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  //to clear give empty FILL
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signIn.click();
  //getting the text by using common class name
  //console.log(await page.locator(".card-body a").first().textContent());
  //console.log(await page.locator(".card-body a").nth(1).textContent());
  //console.log(await page.locator(".card-body a").last().textContent());
  //getting the all text
  await page.waitForLoadState('networkidle');  //sometimes this is flacky so
  await page.locator(".card-body a").last().waitFor();
  const allTexts = await page.locator(".card-body a").allTextContents();
  console.log(allTexts);




})