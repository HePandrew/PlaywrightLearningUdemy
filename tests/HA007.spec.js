const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

const NameReqiredMsg = " Username is required ";
const Email = "xavier@gmail.com";


test('@regression1 Username required - HA007', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email);
        await page.waitForTimeout(1000);
        await LoginClass.username.fill('');
        await page.locator("//*[@alt='Hive']").click();
        await expect(LoginClass.invalidFieldMessage).toHaveText(NameReqiredMsg);

        await LoginClass.username.fill(Email);
        expect(await page.waitForSelector('.invalid-text-danger', {state:'detached'})).toBeTruthy;
    })