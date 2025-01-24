const {test, expect} = require('@playwright/test');

test('other end to end method', async ({page})=>
{
    const productName = 'ZARA COAT 3';
    const email = 'vjh@gmail.com';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Test1234");
    await page.getByRole("button",{name: "Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-boby b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name: "Add to Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name: "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})