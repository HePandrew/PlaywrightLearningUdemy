const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');



test('end to end concept', async ({page})=>
{
    const poManager = new POManager(page);
    const productName = 'ZARA COAT 3';
    const email = 'vjh@gmail.com';
    const products = page.locator(".card-body");
    const loginpageClass = poManager.getLoginPage();
    //loginpageClass.goTo();
    await page.goto("https://rahulshettyacademy.com/client");
    loginpageClass.validLogin();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count =await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text===" India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator("label[type='text']")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderId1 = orderId.split("| ")[1];
    const orderId2 = orderId1.split(" ")[0];
    console.log(orderId2);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator('tbody').waitFor();
    const orderrow = page.locator("tbody tr");
    for(let i=0;i<await orderrow.count();++i){
        const texta = await orderrow.nth(i).locator("[scope='row']").textContent();
        if(texta===orderId2){
            await orderrow.nth(i).locator(".btn-primary").click();
            break;
        }
        else{console.log("no if");}
    }
    const orderSummary = await page.locator(".col-text").textContent();
    expect(orderId2.includes(orderSummary)).toBeTruthy();
})