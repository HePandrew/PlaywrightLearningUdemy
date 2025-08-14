const {test, expect} = require('@playwright/test');

test('more controls and validations', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //to handle browser dialog/alert box
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframes");
    // using ':visible' keyword is used when there is 2 css , but 1 is visible in UI other is not visible 
    framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

})