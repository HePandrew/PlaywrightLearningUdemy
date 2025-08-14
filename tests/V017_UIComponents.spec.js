const {test, expect} = require('@playwright/test');

test('UI components test', async ({page})=>
{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const documentLink = page.locator("[href*='documents-request']");
  //dropdown selecting from select class using 'selectOption'
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult"); //conslt is one of the dropdown value
  await page.locator('.radiotextsty').last().click();//this is clcking radio button
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked(); //expect keyword is for assertion
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect (await page.locator('#terms').isChecked()).toBeFalsy();
  //checking the link is blinking by using the class name
  await expect(documentLink).toHaveAttribute("class","blinkingText");

})

test.only('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
//this is for new window, when clicked link 'newpage' is the control for new page
    const [newPage] = await Promise.all([

      context.waitForEvent('page'),
      documentLink.click(),
      ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")[1]
    const domain = arrayText.split(" ")[0]
    console.log(domain);
    await page.locator('#username').fill(domain);
    //await page.pause();
    console.log(await page.locator('#username').textContent());



})