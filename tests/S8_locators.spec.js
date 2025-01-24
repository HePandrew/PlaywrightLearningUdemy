const {test, expect} = require('@playwright/test');

test('Playwright Special Locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //'getByLable' method used by the lable name
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    //selecting a option from static drpodown
    await page.getByLabel("Gender").selectOption("Female");
    //filling a text field by placeholder
    await page.getByPlaceholder("Password").fill("abc123");
    //by using ROLE to click a submit button - in the below code "button" is css tag name
    await page.getByRole("button",{name: 'Submit'}).click();
    //checking (assert) text is visible
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //clicking a page using its name
    await page.getByRole("link",{name: "Shop"}).click();
    //clicking Add button for a product filtering from multiple products
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})